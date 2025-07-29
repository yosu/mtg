function main() {
  svg = d3.select("svg")
    .style("caret-color", "transparent") // hide the caret cursor
    .style("touch-action", "manipulation") // prevent double-tap zoom feature

  const { width, height } = svg.node().getBoundingClientRect()

  const g1 = svg.append("g")
    .attr("transform", `rotate(180 ${width/2} ${height/4})`)

  const g2 = svg.append("g")
    .attr("transform", `translate(0, ${height/2})`)

  const reset1 = createViz(g1, width, height/2)
  const reset2 = createViz(g2, width, height/2)

  svg.append("line")
    .attr("x1", 10)
    .attr("y1", height/2)
    .attr("x2", width-20)
    .attr("y2", height/2)
    .attr("stroke", "gray")

  const resetWidth = 120;
  const resetHeight = 60;
  const resetX = width / 2 - resetWidth / 2;
  const resetY = height / 2 - resetHeight / 2;

  svg.append("rect")
    .attr("x", resetX)
    .attr("y", resetY)
    .attr("width", resetWidth)
    .attr("height", resetHeight)
    .attr("fill", "white")
    .on("click", () => {
      reset1()
      reset2()
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

    g.append("path")
      .attr("d", d3.arc()({
        innerRadius: r,
        outerRadius: r + 4,
        startAngle: -Math.PI * 0.4,
        endAngle: Math.PI * 0.4
      }))
      .attr("fill", "gray")
      .attr("pointer-events", "none")

    g.append("path")
      .attr("d", d3.arc()({
        innerRadius: r,
        outerRadius: r + 4,
        startAngle: Math.PI * 1.4,
        endAngle: Math.PI * 0.6
      }))
      .attr("fill", "gray")
      .attr("pointer-events", "none")

    g.append("path")
      .attr("transform", `translate(${r*Math.cos(Math.PI)}, ${r * Math.sin(Math.PI*0.9)}) rotate(${-20}) scale(1.2)`)
      .attr("d", d3.symbol(d3.symbolTriangle))
      .attr("fill", "gray")

    g.append("path")
      .attr("transform", `translate(${r*Math.cos(-Math.PI*0)}, ${r * Math.sin(-Math.PI*0.1)}) rotate(${35}) scale(1.2)`)
      .attr("d", d3.symbol(d3.symbolTriangle))
      .attr("fill", "gray")

  }

  drawResetIcon(g)
}

function createViz(g, width, height) {
  let data = [{value: 20}]

  const createButtons = () => {
    const buttons = ["+", "-"]

    const r = 38;

    g.selectAll(".button-circle")
      .data(buttons)
      .join("circle")
      .attr("class", ".button-circle")
      .attr("cx", (_d, i) => width/4+width/2*i)
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
      .attr("x1", width * 0.75 - 12)
      .attr("y1", height/2)
      .attr("x2", width * 0.75 + 12)
      .attr("y2", height/2)
      .attr("stroke", "gray")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")

    g.append("line")
      .attr("class", "plus")
      .attr("x1", width * 0.25 - 12)
      .attr("y1", height/2)
      .attr("x2", width * 0.25 + 12)
      .attr("y2", height/2)
      .attr("stroke", "gray")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")

    g.append("line")
      .attr("class", "plus")
      .attr("x1", width * 0.25)
      .attr("y1", height/2 - 12)
      .attr("x2", width * 0.25)
      .attr("y2", height/2 + 12)
      .attr("stroke", "gray")
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
      .attr("font-family", "serif")
      .attr("font-size", 48)
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
