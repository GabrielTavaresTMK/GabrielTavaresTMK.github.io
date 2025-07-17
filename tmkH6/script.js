google.charts.load('current', {'packages':['corechart', 'geochart']});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  const barData = google.visualization.arrayToDataTable([
    ['Bimestre', 'Frequência', { role: 'style' }],
    ['1º BIM', 89.5, 'color: black'],
    ['2º BIM', 90.8, 'color: gray'],
    ['3º BIM', 86.4, 'color: black'],
    ['4º BIM', 87.3, 'color: gray'],
  ]);

  const barChart = new google.visualization.BarChart(document.getElementById('barchart'));
  barChart.draw(barData, {
    legend: { position: 'none' },
    hAxis: { minValue: 86,  maxValue: 91 }
  });

  const pieData = google.visualization.arrayToDataTable([
    ['Conceito', 'Quantidade'],
    ['A', 189],
    ['B', 228],
    ['C', 211],
    ['D', 187]
  ]);

  const pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
  pieChart.draw(pieData, {
    colors: ['#ccc', '#999', '#666', '#333'],
    is3D: true,
  });

  const mapData = google.visualization.arrayToDataTable([
    ['País', 'Frequência'],
    ['United States', 300],
    ['Brazil', 400],
    ['France', 600],
    ['Japan', 700]
  ]);

  const mapChart = new google.visualization.GeoChart(document.getElementById('mapchart'));
  mapChart.draw(mapData, {});
}
