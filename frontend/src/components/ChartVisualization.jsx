import { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";

const chartTypes = ["line", "bar", "pie", "doughnut", "radar"];

const calculateStats = (values) => {
  if (values.length === 0) return {};
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { sum, avg, min, max };
};

const colorPalette = [
  "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0",
  "#f77825", "#8e44ad", "#2ecc71", "#3498db", "#e74c3c"
];

export default function ChartVisualization({
  data,
  xColumn,
  yColumn,
  selectedChartType = "All",
  axisMode = "normal" 
}) {
  const chartRefs = useRef([]);
  const chartInstances = useRef([]);

  const labels = useMemo(() => {
    if (!xColumn || !yColumn || !data.length) return [];

    if (axisMode === "onlyY") {
      return data.map((_, i) => `#${i + 1}`); // Use index as label
    } else {
      return data.map((row) => row[xColumn]);
    }
  }, [data, xColumn, yColumn, axisMode]);

  // Memoized values based on axisMode
  const values = useMemo(() => {
    if (!xColumn || !yColumn || !data.length) return [];

    if (axisMode === "onlyX") {
      return data.map((_, i) => i + 1); // Use index as value
    } else {
      return data.map((row) => Number(row[yColumn]) || 0);
    }
  }, [data, xColumn, yColumn, axisMode]);

  // Memoized stats calculation
  const stats = useMemo(() => {
    return calculateStats(values);
  }, [values]);

  useEffect(() => {
    // Destroy old charts
    chartInstances.current.forEach((chart) => chart?.destroy());
    chartInstances.current = [];

    if (!xColumn || !yColumn || !data.length) return;

    const typesToRender =
      selectedChartType === "All" ? chartTypes : [selectedChartType.toLowerCase()];

    typesToRender.forEach((type, index) => {
      const ctx = chartRefs.current[index]?.getContext("2d");
      if (!ctx) return;

      const dataset = {
        label: yColumn,
        data: values,
        borderColor: colorPalette[index % colorPalette.length],
        backgroundColor:
          type === "line"
            ? colorPalette[index % colorPalette.length] + "33"
            : colorPalette[index % colorPalette.length],
        borderWidth: 2,
        fill: type !== "line",
        tension: 0.4,
        pointBackgroundColor: "#222",
        pointRadius: 5,
        pointHoverRadius: 7,
      };

      if (type === "pie" || type === "doughnut") {
        dataset.backgroundColor = colorPalette.slice(0, values.length);
        dataset.borderColor = "#1f1f1f";
        dataset.borderWidth = 1.5;
      }

      const chart = new Chart(ctx, {
        type,
        data: {
          labels,
          datasets: [dataset],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1000,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: "#111",
              titleColor: "#fff",
              bodyColor: "#ccc",
              borderColor: "#444",
              borderWidth: 1,
              titleFont: { size: 14, weight: "bold" },
              bodyFont: { size: 13 },
              padding: 10,
              cornerRadius: 6,
              displayColors: false,
            },
          },
          scales:
            type === "pie" || type === "doughnut"
              ? {}
              : {
                  x: {
                    title: {
                      display: true,
                      text: xColumn,
                      color: "#ddd",
                      font: { size: 14, weight: "500" },
                    },
                    ticks: {
                      color: "#aaa",
                      maxRotation: 45,
                      minRotation: 45,
                    },
                    grid: {
                      color: "rgba(255,255,255,0.05)",
                      borderDash: [4, 4],
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: yColumn,
                      color: "#ddd",
                      font: { size: 14, weight: "500" },
                    },
                    ticks: {
                      color: "#aaa",
                      beginAtZero: true,
                    },
                    grid: {
                      color: "rgba(255,255,255,0.05)",
                      borderDash: [4, 4],
                    },
                  },
                },
        },
      });

      chartInstances.current.push(chart);
    });
  }, [xColumn, yColumn, data, selectedChartType, axisMode, labels, values]);

  // Legend for pie/doughnut
  const CustomLegend = ({ labels, colors }) => (
    <div className="flex flex-wrap gap-3 mt-4">
      {labels.map((label, i) => (
        <div key={label + i} className="flex items-center space-x-2">
          <div
            style={{ backgroundColor: colors[i % colors.length] }}
            className="w-4 h-4 rounded-full border border-gray-600"
          />
          <span className="text-gray-300 text-sm">{label}</span>
        </div>
      ))}
    </div>
  );

  // Chart section wrapper
  const ChartSection = ({ type, idx }) => {
    const chartTitle = `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`;

    const handleDownload = () => {
      const canvas = chartRefs.current[idx];
      if (!canvas) return;
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-chart.png`;
      a.click();
    };

    return (
      <section
        className="bg-gradient-to-br from-black via-gray-900 to-black
        rounded-2xl p-10 mb-10 shadow-lg border border-gray-700 w-full max-w-6xl mx-auto"
      >
        <header className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h3 className="text-3xl font-semibold text-white">{chartTitle}</h3>
          <div className="flex flex-col md:flex-row items-center space-x-4 text-sm text-gray-400 mt-2 md:mt-0">
            <div className="italic">
              Sum: {stats.sum?.toFixed(1)} | Avg: {stats.avg?.toFixed(2)} | Min: {stats.min} | Max: {stats.max}
            </div>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
              title="Download Chart"
            >
              Download
            </button>
          </div>
        </header>

        <canvas
          ref={(el) => (chartRefs.current[idx] = el)}
          className="w-full h-[600px] rounded-xl bg-black shadow"
        />

        {(type === "pie" || type === "doughnut") && (
          <CustomLegend labels={labels} colors={colorPalette} />
        )}

        <p className="mt-6 text-gray-400 text-sm leading-relaxed">
          {type === "line" &&
            "A line chart representing continuous data changes over time or categories."}
          {type === "bar" &&
            "A bar chart displaying comparisons among discrete categories."}
          {type === "pie" && "A pie chart showing proportions in a circular form."}
          {type === "doughnut" &&
            "A doughnut chart offering a variation of the pie chart with a blank center."}
          {type === "radar" &&
            "A radar chart mapping multiple variables in a web-like shape."}
        </p>
      </section>
    );
  };

  // Render
  return (
    <div className="flex flex-col items-center px-4 py-10">
      {selectedChartType === "All"
        ? chartTypes.map((type, idx) => <ChartSection key={type} type={type} idx={idx} />)
        : (() => {
            const type = selectedChartType.toLowerCase();
            const idx = chartTypes.indexOf(type);
            if (idx === -1) return null;
            return <ChartSection type={type} idx={0} />;
          })()}
    </div>
  );
}
