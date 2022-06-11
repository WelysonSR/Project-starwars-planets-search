import React, { useContext, useEffect, useState } from 'react';
import Forms from '../components/Forms';
import Table from '../components/Table';
import StarContext from '../context/StarContext';
import Loading from './Loading';

function Home() {
  const { loadingFetch } = useContext(StarContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const number = 6000;
    setTimeout(() => {
      setLoading(loadingFetch);
    }, number);
  }, [loadingFetch]);

  return (
    <div>
      {
        loading ? <Loading /> : (
          <div>
            <Forms />
            <Table />
          </div>
        )
      }
    </div>
  );
}

export default Home;
