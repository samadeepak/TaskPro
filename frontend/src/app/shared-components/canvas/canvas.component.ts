import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { raceInit } from 'rxjs/internal/observable/race';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @Input() name!: string;
  @Input() width!: number;
  @Input() height!: number;

  private wrapperSelector!: string;
  private svg: any;
  // private width = window.innerWidth;;
  // private height = window.innerHeight;
  private borderColor = "#e2e2e2"
  private backgroundColor = "#f1f1f1"
  private gridCellSize = 17;
  private numGridCellsX = 0;
  private numGridCellsY = 0;
  private horizontalLines: number[] = [];
  private verticalLines: number[] = [];

  ngAfterViewInit(): void {
    this.wrapperSelector = "." + this.name + "-canvas-wrapper";
    this.numGridCellsX = Math.ceil(this.width / this.gridCellSize);
    this.numGridCellsY = Math.ceil(this.height / this.gridCellSize);
    this.horizontalLines = d3.range(this.numGridCellsX)
    this.verticalLines = d3.range(this.numGridCellsY)

    this.createSvg();
    this.generateGrid();
    this.drawPathV2(200, 200, 160, 60, 2, true);
    //this.generatePath();
    //this.drawNode();
    // this.test(this.svg);
  }

  ngOnInit(): void {

  }

  drawNode() {

  }

  generateGrid() {
    const grid = this.svg.append("g").attr("class", "grid");
    grid.selectAll(".horizontal-lines")
      .data(this.horizontalLines)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", (d: number) => d * this.gridCellSize)
      .attr("y1", 0)
      .attr("x2", (d: number) => d * this.gridCellSize)
      .attr("y2", this.height)
      .style("stroke", "#ddd");

    grid.selectAll(".vertical-lines")
      .data(this.verticalLines)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("y1", (d: number) => d * this.gridCellSize)
      .attr("x2", this.width)
      .attr("y2", (d: number) => d * this.gridCellSize)
      .style("stroke", "#ddd");
  }

  private createSvg(): void {
    this.svg = d3.select(this.wrapperSelector)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("stroke", this.borderColor)
      .style("background-color", this.backgroundColor);
  }


  drawArc(startX: number, startY: number, radius: number) {
    const arcGenerator = d3.arc()
      .outerRadius(0)
      .innerRadius(radius)
      .startAngle(0)
      .endAngle(2 * Math.PI / 2);
    //return arcGenerator;

    const arc = this.svg.append("path")
      .attr("d", arcGenerator)
      //.attr("fill", "transparent")
      .attr("fill", "green")
      .style("stroke", "gray")
      .attr("transform", "translate(" + startX + "," + startY + ")");
  }

  path(pathData: number[][]) {
    // Line generator
    const lineGenerator = d3.line()
      .x(d => d[0])
      .y(d => d[1])
      .defined(d => !isNaN(d[0]) && !isNaN(d[1]))
      .curve(d3.curveLinear);

    this.svg.append('path')
      .datum(pathData)
      .attr("d", lineGenerator)
      .attr("fill", "lightblue")
      .attr("stroke", "black");
  }

  drawPathV2(x: number, y: number, width: number, height: number, numberOfInputs: number, circular: boolean) {
    const radius: number = 7;
    const diameter = 2 * radius;
    const inputCircleRadius: number = 10;
    let edgeSize = (height - (2 * numberOfInputs * radius)) / (numberOfInputs + 1);


    const pathData = [
      [x, y],   // Start point
      [x + width, y], // LineTo point 1
      [x + width, y + height],  // LineTo point 2
      [x, y + height],  // LineTo point 3

      // 1st EDGE
      [x, y + height - edgeSize]
    ]

    if (!circular) {
      // Draw edges with nudge
      for (let ec = 0; ec < numberOfInputs; ec++) {

        pathData.push([x + diameter, y + height - (ec + 1) * edgeSize - (ec) * diameter]);
        pathData.push([x + diameter, y + height - (ec + 1) * edgeSize - (ec + 1) * diameter])
        pathData.push([x, y + height - (ec + 1) * edgeSize - (ec + 1) * diameter]);
        pathData.push([x, y + height - (ec + 2) * edgeSize - (ec + 1) * diameter]);
        // pathData.push([x + diameter, y + height - edgeSize]);
        // pathData.push([x + diameter, y + height - edgeSize - diameter]);
        // pathData.push([x, y + height - edgeSize - diameter]);
        // pathData.push([x, y + height - (ec + 2) * edgeSize - (ec + 1) * diameter]);
      }
    }
    else {
      // EDGES 
      for (let i = 0; i < numberOfInputs; i++) {
        pathData.push([NaN, NaN]);
        pathData.push([x, y + height - (i + 1) * edgeSize - (i + 1) * diameter]);
        pathData.push([x, y + height - (i + 2) * edgeSize - (i + 1) * diameter]),
          this.drawArc(x, y + height - edgeSize - radius, radius)
      }
    }

    this.path(pathData);

    if (circular) {
      for (let ac = 0; ac < numberOfInputs; ac++) {
        this.drawArc(x, y + height - (ac + 1) * edgeSize - (ac) * diameter - radius, radius)
      }
    }

  }
  drawPath(x: number, y: number, width: number, height: number) {
    const radius: number = 7;
    const diameter = 2 * radius;
    const inputCircleRadius: number = 10;
    let edgeSize = (height - (4 * radius)) / 3;

    const pathData = [
      [x, y],   // Start point
      [x + width, y], // LineTo point 1
      [x + width, y + height],  // LineTo point 2
      [x, y + height],  // LineTo point 3

      // 1st EDGE
      [x, y + height - edgeSize],
      // [NaN, NaN],

      //1st input
      // [x + diameter, y + height - edgeSize],
      // [x + diameter, y + height - edgeSize - diameter],
      // [x, y + height - edgeSize - diameter],

      //2nd EDGE
      // [x, y + height - edgeSize - diameter],
      [x, y + height - 2 * edgeSize - diameter],

      // 2st input
      // [x + diameter, y + height - 2 * edgeSize - diameter],
      // [x + diameter, y + height - 2 * edgeSize - 2 * diameter],
      // [x, y + height - 2* edgeSize - 2 * diameter],

      // 3rd EDGE
      // [x, y + height - 2 * edgeSize - 2 * diameter],
      [x, y + height - 3 * edgeSize - 2 * diameter],
    ];

    this.path(pathData);
    this.drawArc(x, y + height - edgeSize - radius, radius)
    this.drawArc(x, y + height - 2 * edgeSize - diameter - radius, radius)
  }



  generatePath() {

    const x = 20;
    const y = 20;

    const width = 200;
    const height = 100;
    const rectWidth = 100;
    const rectHeight = 50;
    const radius = rectHeight / 2;
    const numberOfInputs = 2;

    const inputCircleRadius = 5;

    const inputEdgeSize = (rectHeight - (numberOfInputs * 2 * inputCircleRadius)) / (numberOfInputs + 1)

    const rectPath = d3.path();

    rectPath.moveTo(x, y);
    rectPath.lineTo(x + rectWidth, y);
    rectPath.lineTo(x + rectWidth, y + rectHeight);
    rectPath.lineTo(x, y + rectHeight);

    const halfCircle = d3.arc()
      .innerRadius(0)
      .outerRadius(inputCircleRadius)
      .startAngle(Math.PI)
      .endAngle(2 * Math.PI);

    for (let i = 0; i < numberOfInputs; i++) {
      rectPath.lineTo(x, y + rectHeight - inputEdgeSize);
    }

    this.svg.append('path')
      .attr("d", rectPath)
      .attr("fill", "lightblue")
      .attr("stroke", "black");

    const arc = this.svg.append("path")
      .attr("d", this.drawArc(10, 10, 8))
      .style("stroke", "red")
      .attr("transform", "translate(150,120)");
  }

  test(svg: any) {
    // Rectangle properties
    const x = 50;
    const y = 50;
    const width = 100;
    const height = 80;
    const cornerRadius = 10;
    // Create the path string
    const pathString = `
M ${x + cornerRadius} ${y} 
L ${x + width - cornerRadius} ${y} 
A ${cornerRadius} ${cornerRadius} 0 0 1 ${x + width} ${y + cornerRadius}
L ${x + width} ${y + height - cornerRadius} 
A ${cornerRadius} ${cornerRadius} 0 0 1 ${x + width - cornerRadius} ${y + height}
L ${x + cornerRadius} ${y + height} 
A ${cornerRadius} ${cornerRadius} 0 0 1 ${x} ${y + height - cornerRadius}
L ${x} ${y + cornerRadius}
A ${cornerRadius} ${cornerRadius} 0 0 1 ${x + cornerRadius} ${y}
Z`;

    // Draw the rounded rectangle
    svg.append("path")
      .attr("d", pathString)
      .style("fill", "lightblue")
      .style("stroke", "black");
  }

}
