import { useState, useEffect } from 'react';

export default function useLatestData() {
  // hotslices
  const [hotslices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // use a side effect to fetch the data from the graphql endpoint

  useEffect(() => {
    // when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query{
                StoreSettings (id: "downtown") {
                  name
                  slicemaster{
                    name
                  }
                  hotSlices{
                    name
                  }
                }
              }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // check for errors
        // set the data to state

        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return { hotslices, slicemasters };
}
