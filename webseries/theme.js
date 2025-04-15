
function changeGlowColor(colorClass) {
        let root = document.documentElement;
        
        
        let colorMap = {
            'glow-orange': '#ff8c00',
            'glow-lightblue': '#00bfff',
            'glow-purple': '#a020f0',
            'glow-red': 'red'
        };
        
        localStorage.setItem("colorClass1",colorMap[colorClass])
        if (colorMap[colorClass]) {
            
            let temp=localStorage.getItem("colorClass1");
            root.style.setProperty('--glow-color', temp);
            console.log(temp)
            console.log("Color changed to:", colorMap[colorClass]); 
        } else {
            console.error("Invalid color class:", colorClass);
        }
    }
    window.onload=()=>{ 
        let root = document.documentElement;
        let temp=localStorage.getItem("colorClass1");
        root.style.setProperty('--glow-color', temp);
        
    }
