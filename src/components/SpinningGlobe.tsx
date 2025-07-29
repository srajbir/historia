"use client";

import { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import { Telescope } from 'lucide-react';

export default function SpinningGlobe() {
  const chartRef = useRef<am5.Root | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { darkMode } = useTheme();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!inView || chartRef.current) return;

    const root = am5.Root.new('chartdiv');
    chartRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fillOpacity: 1,
      strokeOpacity: 0,
      fill: am5.color(darkMode ? '#273b7a' : '#5a78f0'),
      filter: 'drop-shadow(2px 2px 12px #273b7a)',
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({ strokeOpacity: 0 });

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      toggleKey: 'active',
      interactive: true,
      cursorOverStyle: 'pointer',
      fill: am5.color(darkMode ? '#4f8a28' : '#78C841'),
      stroke: am5.color('#2d4f17'),
    });
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color('#2d4f17'),
    });

    const iniCurrentRotation = chart.get('rotationX') || -90;
    let rotationAnimation = chart.animate({
      key: 'rotationX',
      from: iniCurrentRotation,
      to: iniCurrentRotation + 360,
      duration: 30000,
      loops: Infinity,
    });

    let timeout: NodeJS.Timeout | null = null;
    const stopAutoRotate = () => {
      if (rotationAnimation?.playing) rotationAnimation.stop();
      if (timeout) clearTimeout(timeout);
    };

    const resumeAutoRotate = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentRotation = chart.get('rotationX') || -90;
        rotationAnimation = chart.animate({
          key: 'rotationX',
          from: currentRotation,
          to: currentRotation + 360,
          duration: 30000,
          loops: Infinity,
        });
      }, 2500);
    };

    const canvas = root.dom as HTMLDivElement;
    canvas.addEventListener('pointerdown', stopAutoRotate);
    canvas.addEventListener('pointerup', resumeAutoRotate);

    chart.appear(1000, 100);

    return () => {
      if (timeout) clearTimeout(timeout);
      canvas.removeEventListener('pointerdown', stopAutoRotate);
      canvas.removeEventListener('pointerup', resumeAutoRotate);
      root.dispose();
      chartRef.current = null;
    };
  }, [darkMode, inView]);

  return (
    <section
      ref={sectionRef}
      className="rounded w-full flex justify-center items-center shadow bg-white/70 dark:bg-[#1f1f1f99] lg:p-6 p-3 my-6 flex-col-reverse md:flex-row gap-2"
    >
      {/* Always rendered, chart only initializes when inView */}
      <div
        id="chartdiv"
        className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl lg:h-[550px] md:h-[450px] h-[400px]"
      />

      <div className="relative flex flex-col md:items-start items-center text-center md:text-left px-2">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl lg:text-4xl font-bold drop-shadow-md text-black dark:text-white">
            Welcome to <span className="text-blue-600 dark:text-blue-400">Historia</span>
          </h1>
        </div>
        <p className="mt-2 max-w-md text-sm md:text-base text-gray-800 dark:text-gray-300 drop-shadow-md">
          Learn the Legends, Events, and History of the World.
        </p>
        <Link
          href="/explore"
          className="mt-4 inline-flex items-center btn rounded-full! px-5! drop-shadow-md"
        >
          <Telescope className="mr-3 h-5 w-5" />
          Explore
        </Link>
      </div>
    </section>
  );
}
