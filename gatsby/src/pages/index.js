import React from 'react';
import Layout from '../components/Layout';
import LoadingGrid from '../components/LoadingGrid';
import Nav from '../components/Nav';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
    </div>
  );
}

function HotSlices({ hotslices }) {
  return (
    <div>
      {!hotslices && <LoadingGrid count={4} />}
      {hotslices && !hotslices?.length && <p>Nothin' in the case.</p>}
    </div>
  );
}

export default function HomePage() {
  const { hotslices, slicemasters } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown</h1>
      <p>Open 11am to 11pm Every Single Day</p>

      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />

        <HotSlices hotslices={hotslices} />
      </HomePageGrid>
    </div>
  );
}
