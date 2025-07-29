function randomPair(upperBound) {
  const a = Math.floor(Math.random() * upperBound)
  let b = a;
  while (a === b) {
    b = Math.floor(Math.random() * upperBound)
  }

  return [a, b];
}

function main() {
  svg = d3.select("svg")
    .style("caret-color", "transparent") // hide the caret cursor
    .style("touch-action", "manipulation") // prevent double-tap zoom feature

  const { width, height } = svg.node().getBoundingClientRect()

  const g1 = svg.append("g")
    .attr("transform", `rotate(180 ${width/2} ${height/4})`)

  const g2 = svg.append("g")
    .attr("transform", `translate(0, ${height/2})`)

  const drawBackground = (g, width, height, fill) => {
    g.append("rect")
      .attr("class", "bg")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", fill)
  }

  const updateBackground = (g, fill) => {
    g.select(".bg")
      .transition()
      .attr("fill", fill)
  }

  const colors = [
    d3.schemePaired[0], d3.schemePaired[1],
    d3.schemePaired[2], d3.schemePaired[3],
    d3.schemePaired[6], d3.schemePaired[7],
    d3.schemePaired[8], d3.schemePaired[9],
    "lightgray", "gray",
    "firebrick", "mistyrose",
  ]
  const pair = randomPair(colors.length)

  drawBackground(g1, width, height/2, colors[pair[0]])
  drawBackground(g2, width, height/2, colors[pair[1]])

  const reset1 = createViz(g1, width, height/2)
  const reset2 = createViz(g2, width, height/2)

  const resetWidth = 100;
  const resetHeight = 100;
  const resetX = width / 2 - resetWidth / 2;
  const resetY = height / 2 - resetHeight / 2;

  svg.append("rect")
    .attr("x", resetX)
    .attr("y", resetY)
    .attr("width", resetWidth)
    .attr("height", resetHeight)
    .attr("fill", "transparent")
    .on("click", () => {
      reset1()
      reset2()

      const cols = randomPair(colors.length)

      updateBackground(g1, colors[cols[0]])
      updateBackground(g2, colors[cols[1]])
    })

    /*
  svg.append("text")
    .text("Reset")
    .attr("x", resetX + resetWidth/2)
    .attr("y", resetY + resetHeight/2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", 32)
    .attr("pointer-events", "none") // skip click events
    */

  const g = svg.append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`)

  const drawResetIcon = (g) => {
    const r = 24;
    const fill = "black"

    g.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", r + 16)
      .attr("fill", "lightgray")
      .attr("pointer-events", "none")

    g.append("path")
      .attr("d", d3.arc()({
        innerRadius: r,
        outerRadius: r + 4,
        startAngle: -Math.PI * 0.4,
        endAngle: Math.PI * 0.4
      }))
      .attr("fill", fill)
      .attr("pointer-events", "none")

    g.append("path")
      .attr("d", d3.arc()({
        innerRadius: r,
        outerRadius: r + 4,
        startAngle: Math.PI * 1.4,
        endAngle: Math.PI * 0.6
      }))
      .attr("fill", fill)
      .attr("pointer-events", "none")

    g.append("path")
      .attr("transform", `translate(${r*Math.cos(Math.PI)}, ${r * Math.sin(Math.PI*0.9)}) rotate(${-20}) scale(1.2)`)
      .attr("d", d3.symbol(d3.symbolTriangle))
      .attr("fill", fill)

    g.append("path")
      .attr("transform", `translate(${r*Math.cos(-Math.PI*0)}, ${r * Math.sin(-Math.PI*0.1)}) rotate(${35}) scale(1.2)`)
      .attr("d", d3.symbol(d3.symbolTriangle))
      .attr("fill", fill)

  }

  drawResetIcon(g)
}

function createViz(g, width, height) {
  let data = [{value: 20}]

  const createButtons = () => {
    const buttons = ["-", "+"]
    const stroke = "white"

    const r = 45;

    g.selectAll(".button-circle")
      .data(buttons)
      .join("circle")
      .attr("class", ".button-circle")
      .attr("cx", (_d, i) => width/6+width/1.5*i)
      .attr("cy", height/2)
      .attr("r", r)
      .attr("fill", "transparent")
      .on("click", (_e, d) => {
        data[0].value += (d === "+") ? 1 : -1;
        updateCounter()
      })

    /*
    g.selectAll(".button")
      .data(buttons)
      .join("text")
        .attr("class", "button")
      .text(d => d)
      .attr("x", (_d, i) => width/4+width/2*i)
      .attr("y", height/2 + 2)
      .attr("font-size", 48)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("pointer-events", "none") // skip click events
      */

    g.append("line")
      .attr("class", "minus")
      .attr("x1", width * 0.2 - 12)
      .attr("y1", height/2)
      .attr("x2", width * 0.2 + 12)
      .attr("y2", height/2)
      .attr("stroke", stroke)
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")

    g.append("line")
      .attr("class", "plus")
      .attr("x1", width * 0.8 - 12)
      .attr("y1", height/2)
      .attr("x2", width * 0.8 + 12)
      .attr("y2", height/2)
      .attr("stroke", stroke)
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")


    g.append("line")
      .attr("class", "plus")
      .attr("x1", width * 0.8)
      .attr("y1", height/2 - 12)
      .attr("x2", width * 0.8)
      .attr("y2", height/2 + 12)
      .attr("stroke", stroke)
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
  }

  g.selectAll(".counter")
    .data(data)
    .join("text")
      .attr("class", "counter")
      .text(d => d.value)
      .attr("x", width/2)
      .attr("y", height/2)
      .attr("font-family", "Courier, Times New Roman, serif")
      .attr("font-size", 96)
      .attr("font-weight", "bold")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")

  const updateCounter = () => {
    g.selectAll(".counter")
    .data(data)
    .join("text")
      .text(d => d.value)
  }

  createButtons()

  // returns reset function
  return () => {
    data[0].value = 20;
    updateCounter()
  }
}

main();
