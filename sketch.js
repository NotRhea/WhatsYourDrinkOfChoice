let cocktails = [
    { name: 'Negroni', glass: 'rectangle', color: '#e43c24', garnish: 'orange' },
    { name: 'Martini', glass: 'triangle',  color: '#e0e0e0', garnish: 'olive' },
    { name: 'Old Fashioned', glass: 'rectangle', color: '#f28c28', garnish: 'cherry' },
    { name: 'Margarita', glass: 'triangle',  color: '#b2d9a6', garnish: 'lime' },
    { name: 'Mojito', glass: 'rectangle', color: '#a8e6cf', garnish: 'mint' }
  ];
  
  let glassSelect, garnishSelect;
  
  function setup() {
    createCanvas(1200, 700); 
    angleMode(DEGREES);
    noLoop();
  
    // Glass filter dropdown
    glassSelect = createSelect();
    glassSelect.position(20, 10);
    glassSelect.option('all');
    glassSelect.option('rectangle');
    glassSelect.option('triangle');
    glassSelect.changed(redraw);
  
    // Garnish filter dropdown
    garnishSelect = createSelect();
    garnishSelect.position(170, 10);
    garnishSelect.option('all');
    garnishSelect.option('orange');
    garnishSelect.option('olive');
    garnishSelect.option('cherry');
    garnishSelect.option('lime');
    garnishSelect.option('mint');
    garnishSelect.changed(redraw);
  }
  
  function draw() {
    background(255);
    textSize(18);
    noStroke();
    fill(80);
    text('Filter by Glass:', 20, 45);
    text('Filter by Garnish:', 170, 45);
  
    let glassFilter = glassSelect.value();
    let garnishFilter = garnishSelect.value();
  
    // Filter cocktails based on dropdowns
    let filtered = cocktails.filter(cocktail => {
      let glassMatch = (glassFilter === 'all' || cocktail.glass === glassFilter);
      let garnishMatch = (garnishFilter === 'all' || cocktail.garnish === garnishFilter);
      return glassMatch && garnishMatch;
    });
  
    // Center the row of cocktails
    let spacing = 170; // space between drinks
    let n = filtered.length;
    let totalWidth = (n - 1) * spacing;
    let startX = width/2 - totalWidth/2;
  
    for (let i = 0; i < n; i++) {
      drawCocktail(filtered[i], startX + i * spacing, height/2);
    }
  }
  
  function drawCocktail(cocktail, x, y) {
    push();
    translate(x, y);
  
    // Hover detection (scaled up)
    let w = cocktail.glass === 'rectangle' ? 100 : 140;
    let h = 200;
    let hovered = mouseX > x - w/2 && mouseX < x + w/2 &&
                  mouseY > y - h/2 && mouseY < y + h/2;
  
    // Glass & liquid (BIG)
    if (cocktail.glass === 'rectangle') {
      fill(cocktail.color);
      noStroke();
      rect(-50, -100, 100, 200, 6); // larger rectangle glass
    } else if (cocktail.glass === 'triangle') {
      push();
      rotate(180);
      fill(cocktail.color);
      noStroke();
      triangle(0, 0, 70, 140, -70, 140); // larger martini
      pop();
    }
  
    // Garnish (scaled and repositioned)
    noStroke();
    if (cocktail.garnish === 'orange') {
      fill('#fca937');
      ellipse(0, 80, 42, 42);
      push();
      translate(-38, -100);
      rotate(-30);
      arc(0, 0, 50, 50, 0, 180, OPEN);
      pop();
    } else if (cocktail.garnish === 'olive') {
      fill('#364136');
      ellipse(0, -35, 30, 30);
      stroke('#000');
      strokeWeight(3);
      line(0, 50, -18, 88);
    } else if (cocktail.garnish === 'cherry') {
      fill('#b10023');
      ellipse(32, -95, 25, 25);
    } else if (cocktail.garnish === 'lime') {
      fill('#009688');
       ellipse(0, -35, 30, 30);
      stroke('#009688');
      strokeWeight(3);
      noFill();
      arc(50, -125, 30, 30, 210, 330);
    } else if (cocktail.garnish === 'mint') {
      fill('#58b368');
      ellipse(28, -10, 22, 45);
      ellipse(-28, -95, 18, 30);
    }
  
    // --- INFO CARD ON HOVER ---
    if (hovered) {
      drawInfoCard(0, -140, cocktail); // position above the drink, adjust as needed
    }
  
    pop();
  }
  
  function drawInfoCard(x, y, cocktail) {
    // ---- STYLE THE CARD HERE ----
    let cardWidth = 170;
    let cardHeight = 80;
    let borderRadius = 16;
  
    // Card background and border
    fill(255, 245, 210, 245); // light yellowish, semi-opaque
    stroke(120, 100, 70, 100); // soft border
    strokeWeight(2.5);
    rectMode(CENTER);
    rect(x, y, cardWidth, cardHeight, borderRadius);
  
    // Text
    noStroke();
    fill(50);
    textAlign(CENTER, TOP);
    textSize(20);
    textStyle(BOLD);
    text(cocktail.name, x, y - 28);
  
    textStyle(NORMAL);
    textSize(15);
    text("Glass: " + cocktail.glass, x, y - 6);
    text("Garnish: " + cocktail.garnish, x, y + 18);
  
    // ----- You can change cardWidth, colors, borderRadius, text size/style above -----
  }
  
  function mouseMoved() {
    redraw();
  }
  
  