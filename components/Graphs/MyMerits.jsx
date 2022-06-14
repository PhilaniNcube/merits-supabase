import React, { Suspense, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import * as d3 from 'd3';
import { supabase } from '../../utils/supabase';
import Loading from '../Loading';
import useMeasure from 'react-use-measure';
import { svg } from 'd3';

const MyMerits = () => {
  const [ref, { height, width }] = useMeasure();
  const mymeritsQuery = useQuery(
    'mymerits',
    async () => {
      let sports = await supabase.rpc('get_sports_merits');
      let academic = await supabase.rpc('get_academic_merits');
      let social = await supabase.rpc('get_social_merits');

      return [
        { item: 'sports', count: sports.data, color: '#ffaB22' },
        { item: 'social', count: social.data, color: '#134e6f' },
        { item: 'academic', count: academic.data, color: '#de20e6' },
      ];
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const pieChart = useRef();

  let radius = Math.min(width, height) / 2;

  console.log({ radius });

  useEffect(() => {
    const piedata = d3.pie().value((d) => d.count)(mymeritsQuery.data);
    console.log(piedata);

    const arc = d3.arc().innerRadius(50).outerRadius(150);

    const colors = d3.scaleOrdinal(['#ffaB22', '#134e6f', '#de20e6']);

    const svg = d3
      .select(pieChart.current)
      .attr('width', width)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(170, 200)');

    svg
      .append('g')
      .selectAll('path')
      .data(piedata)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', 'white');

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
    <div>
      <Suspense fallback={<Loading />}>
        <h2 className="text-center text-gray-700 mt-3 font-bold text-2xl mb-4">
          My Merits
        </h2>
        <div
          ref={ref}
          id="chart"
          className="bg-sky-100 mt-3 h-[450px] shadow-md rounded-lg"
        >
          <svg ref={pieChart}></svg>

          <div className="flex flex-col space-y-2 py-3 -translate-y-[150%] px-2">
            {mymeritsQuery.isSuccess &&
              mymeritsQuery.data.map((legend, i) => (
                <span key={i} className="flex space-x-3">
                  <span
                    className={`h-5 w-5 bg-[${legend.color}]`}
                    style={{ background: legend.color }}
                  ></span>
                  <p className="text-gray-700 font-medium text-sm uppercase">
                    {legend.item} -{' '}
                    <span className="font-light">{legend.count} points</span>
                  </p>
                </span>
              ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default MyMerits;
