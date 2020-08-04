import React, { useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import YouTubeVideo from '@components/YouTubeVideo';

import HiHeader from '#/#hi/@common/hi-header';
import ScreenSupport from '#/#hi/@common/screen-support';

import ScreenAdvantages from './screen-advantages';
import ScreenHelp from './screen-help';
import ScreenProgress from './screen-progress';
import ScreenServices from './screen-services';
import ScreenStart from './screen-start';
import ScreenTeam from './screen-team';

export interface IHiProps {
  brandName: string;
  classes: any;
  fetchLorder: () => any;
  fetchStatistics: () => any;
  height: number;
  scrollWidth: number;
  width: number;
}

const BLOCKS = {
  start: {
    menu: true,
    name: 'start',
    title: 'homepage.navigation.start',
  },

  help: {
    menu: true,
    name: 'help',
    title: 'homepage.navigation.help',
  },

  services: {
    name: 'services',
    title: 'Услуги',
  },

  advantages: {
    name: 'advantages',
    title: 'Преимущества',
  },

  progress: {
    name: 'progress',
    title: 'Достижения',
  },

  team: {
    menu: true,
    name: 'team',
    title: 'homepage.navigation.team',
  },

  support: {
    menu: true,
    name: 'support',
    title: 'homepage.navigation.support',
  },
};

export const HiTsx: React.FC<IHiProps> = ({ fetchLorder, fetchStatistics, height, scrollWidth, width }) => {
  useEffect(() => {
    fetchStatistics();
    fetchLorder();
  }, [fetchLorder, fetchStatistics]);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {isDesktop ? (
        <YouTubeVideo
          videoId="PT8urv0CtUw"
          opts={{ start: 14, end: 280 }}
          height={height}
          scrollWidth={scrollWidth}
          width={width}
        />
      ) : null}

      <HiHeader blocks={BLOCKS} />

      <ScreenStart name={BLOCKS.start.name} />

      <ScreenHelp name={BLOCKS.help.name} />

      <ScreenServices name={BLOCKS.services.name} />

      <ScreenAdvantages name={BLOCKS.advantages.name} />

      <ScreenProgress name={BLOCKS.progress.name} />

      <ScreenTeam name={BLOCKS.team.name} />

      <ScreenProgress name={BLOCKS.progress.name} />

      <ScreenSupport name={BLOCKS.support.name} />
    </>
  );
};
