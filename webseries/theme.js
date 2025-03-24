function changeGlowColor(colorClass) {
    let root = document.documentElement;

    
    let colorMap = {
        'glow-orange': '#ff8c00',
        'glow-lightblue': '#00bfff',
        'glow-purple': '#a020f0',
        'glow-red': 'red'
    };

    if (colorMap[colorClass]) {
        
        root.style.setProperty('--glow-color', colorMap[colorClass]);
        console.log("Color changed to:", colorMap[colorClass]); 
    } else {
        console.error("Invalid color class:", colorClass);
    }
}
