export function drawTrack(context: CanvasRenderingContext2D) {
  const width = context.canvas.width;
  const height = context.canvas.height;

  // background
  context.fillStyle = "#202020";
  context.fillRect(0, 0, width, height);

  // outer boundary
  context.strokeStyle = "white";
  context.lineWidth = 6;
  context.strokeRect(40, 40, width - 80, height - 80);

  // inner lane
  context.beginPath();
  context.moveTo(120, 120);
  context.lineTo(width - 120, 120);
  context.lineTo(width - 120, height - 120);
  context.lineTo(120, height - 120);
  context.closePath();

  context.strokeStyle = "#555";
  context.lineWidth = 3;
  context.stroke();

  // center line
  context.beginPath();
  context.moveTo(width / 2, 120);
  context.lineTo(width / 2, height - 120);
  context.setLineDash([10, 15]);
  context.strokeStyle = "#888";
  context.lineWidth = 1.5;
  context.stroke();
  context.setLineDash([]);
}
