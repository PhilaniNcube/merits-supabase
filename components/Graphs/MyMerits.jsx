import React, { Fragment, Suspense, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import * as d3 from 'd3';
import Loading from '../Loading';
import useMeasure from 'react-use-measure';

import getTotalMerits, { getMyMerits } from '../../lib/getTotalMerits';

const MyMerits = () => {
  const [ref, { height, width }] = useMeasure();

  const totalMeritsQuery = useQuery('totalMerits', getTotalMerits, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mymeritsQuery = useQuery('mymerits', getMyMerits, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const pieChart = useRef();

  let radius = Math.min(width, height) / 2;

  console.log({ radius });

  useEffect(() => {
    const piedata = d3.pie().value((d) => d.count)(mymeritsQuery.data);
    console.log(piedata);

    const arc = d3.arc().innerRadius(110).outerRadius(150).padAngle(0.05);

    const colors = d3.scaleOrdinal(['#ffaB22', '#134e6f', '#fca0ba']);

    const svg = d3
      .select(pieChart.current)
      .attr('width', width)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(190, 200)');

    svg
      .append('g')
      .selectAll('path')
      .data(piedata)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))


    svg
      .append('text')
      .selectAll('path')
      .data(piedata)
      .attr('x', 30)
      .attr('y', 30)
      .attr('font-size', '14px')
      .attr('color', 'green')
      .text((d) => d.data.item);
  });

  return (
    <div className="relative bg-fuchsia-800 rounded-b-2xl w-full px-4 py-6">

        <h2 className="text-center text-white mt-3 font-bold text-2xl mb-4">
          My Merits
        </h2>
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
          {totalMeritsQuery.isLoading ? (
            <p className="text-2xl text-white text-center">Loading...</p>
          ) : totalMeritsQuery.isError ? (
            <p className="text-2xl text-white">{totalMeritsQuery.error}</p>
          ) : (
            totalMeritsQuery.isSuccess && (
              <span className="flex flex-col items-center justify-center">
                <p className="font-bold text-5xl text-white">
                  {totalMeritsQuery.data}
                </p>
                <small className="text-sm text-white">Total Merits</small>
              </span>
            )
          )}
        </div>
        <div
          ref={ref}
          id="chart"
          className="mt-3 h-[450px] mx-auto w-full rounded-lg relative"
        >
          <svg ref={pieChart} className="mx-auto"></svg>

          <div className="flex flex-col space-y-2 py-3 -translate-y-[150%] px-2">
            {mymeritsQuery.isSuccess &&
              mymeritsQuery.data.map((legend, i) => (
                <span key={i} className="flex space-x-3">
                  <span
                    className={`h-5 w-5 bg-[${legend.color}]`}
                    style={{ background: legend.color }}
                  ></span>
                  <p className="text-white font-medium text-sm uppercase">
                    {legend.item} -{' '}
                    <span className="font-light">
                      {legend.count === null
                        ? '0 merits'
                        : `${legend.count} merits`}
                    </span>
                  </p>
                </span>
              ))}
          </div>
        </div>

    </div>
  );
};

export default MyMerits;
