import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ProcessedReleaseChangeDescription from '~/components/ProcessedReleaseChangeDescription'
import TextSkeleton from '~/components/TextSkeleton'
import useProcessReleases from '~/hooks/useProcessReleases'
import {
  MiscGroupTitles,
  ProcessedReleaseChange,
  Release,
  ReleaseVersion,
  Repository,
  SemVerGroupTitles,
} from '~/models'
import { useReleasesQuery } from '~/queries/release'
import {
  compareReleaseGroupTitlesSort,
  filterReleasesByVersionRange,
  releasesComparator,
} from '~/utils'

interface RepositoryReleasesChangelogProps {
  repository: Repository
  fromVersion?: ReleaseVersion
  toVersion?: ReleaseVersion
}

const RepositoryReleasesChangelog = ({
  repository,
  fromVersion,
  toVersion,
}: RepositoryReleasesChangelogProps) => {
  const [filteredReleases, setFilteredReleases] = useState<Release[] | null>(
    null
  )

  const { processedReleases, isProcessing } = useProcessReleases(
    filteredReleases
  )

  const { data: releases, isLoading, isFetched } = useReleasesQuery({
    repository,
  })

  const shouldShowProcessedReleaseTitle = () => {
    if (!processedReleases) {
      return false
    }

    const groupsTitles = Object.keys(processedReleases)

    return (
      groupsTitles.length > 1 || !groupsTitles.includes(MiscGroupTitles.unknown)
    )
  }

  useEffect(
    function filterReleases() {
      if (releases && fromVersion && toVersion) {
        const newFilteredReleases = filterReleasesByVersionRange({
          releases,
          from: fromVersion,
          to: toVersion,
        }).sort((a, b) => releasesComparator(a, b, 'asc'))
        setFilteredReleases(newFilteredReleases)
      } else {
        setFilteredReleases(null)
      }
    },
    [fromVersion, releases, toVersion]
  )

  // TODO: simplify conditional renders with state machine
  return (
    <>
      {isProcessing && (
        <>
          <Skeleton width="20%" height={8} mb={4} />
          <TextSkeleton />
        </>
      )}

      {!isProcessing && !isLoading && processedReleases && (
        <Stack spacing={6}>
          {Object.keys(processedReleases)
            .sort(compareReleaseGroupTitlesSort)
            .map((title: string) => {
              // TODO: update `release` type to ProcessedReleaseGroup when available
              const processedRelease = processedReleases[title]
              const textTransform =
                title === SemVerGroupTitles.breakingChanges
                  ? 'uppercase'
                  : 'capitalize'
              return (
                <Box key={title}>
                  {shouldShowProcessedReleaseTitle() && (
                    <Heading
                      as="h2"
                      size="xl"
                      mb={4}
                      textTransform={textTransform}
                    >
                      {title}
                    </Heading>
                  )}
                  <Box mb={4}>
                    {processedRelease.map(
                      (processedReleaseChange: ProcessedReleaseChange) => (
                        <ProcessedReleaseChangeDescription
                          key={`${title}-${processedReleaseChange.id}`}
                          repository={repository}
                          processedReleaseChange={processedReleaseChange}
                          mb={8}
                        />
                      )
                    )}
                  </Box>
                </Box>
              )
            })}
        </Stack>
      )}

      {fromVersion &&
        toVersion &&
        !processedReleases &&
        !isProcessing &&
        isFetched && (
          <Alert status="error">
            <AlertIcon />
            No processed releases to show
          </Alert>
        )}

      <style global jsx>{`
        .hljs-comment,
        .hljs-quote {
          color: #998;
          font-style: italic;
        }
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: #333;
          font-weight: bold;
        }
        .hljs-number,
        .hljs-literal,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag .hljs-attr {
          color: #008080;
        }
        .hljs-string,
        .hljs-doctag {
          color: #d14;
        }
        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #900;
          font-weight: bold;
        }
        .hljs-subst {
          font-weight: normal;
        }
        .hljs-type,
        .hljs-class .hljs-title {
          color: #458;
          font-weight: bold;
        }
        .hljs-tag,
        .hljs-name,
        .hljs-attribute {
          color: #000080;
          font-weight: normal;
        }
        .hljs-regexp,
        .hljs-link {
          color: #009926;
        }
        .hljs-symbol,
        .hljs-bullet {
          color: #990073;
        }
        .hljs-built_in,
        .hljs-builtin-name {
          color: #0086b3;
        }
        .hljs-meta {
          color: #999;
          font-weight: bold;
        }
        .hljs-deletion {
          background: #fdd;
        }
        .hljs-addition {
          background: #dfd;
        }
        .hljs-emphasis {
          font-style: italic;
        }
        .hljs-strong {
          font-weight: bold;
        }
      `}</style>
    </>
  )
}

export default RepositoryReleasesChangelog
