// Function to calculate the luminance of a color
function getLuminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Function to calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1.r, color1.g, color1.b);
    const luminance2 = getLuminance(color2.r, color2.g, color2.b);
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    return (brightest + 0.05) / (darkest + 0.05);
}

// Function to convert hex color to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Syncing the color picker with the text input for text color
document.getElementById('textColorPicker').addEventListener('input', function () {
    document.getElementById('textColor').value = this.value;
});

// Syncing the text input with the color picker for text color
document.getElementById('textColor').addEventListener('input', function () {
    const hexPattern = /^#([A-Fa-f0-9]{6})$/;
    if (hexPattern.test(this.value)) {
        document.getElementById('textColorPicker').value = this.value;
    }
});

// Syncing the color picker with the text input for background color
document.getElementById('bgColorPicker').addEventListener('input', function () {
    document.getElementById('bgColor').value = this.value;
});

// Syncing the text input with the color picker for background color
document.getElementById('bgColor').addEventListener('input', function () {
    const hexPattern = /^#([A-Fa-f0-9]{6})$/;
    if (hexPattern.test(this.value)) {
        document.getElementById('bgColorPicker').value = this.value;
    }
});

document.getElementById('checkContrast').addEventListener('click', function () {
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;

    // Validate Hex Codes
    const hexPattern = /^#([A-Fa-f0-9]{6})$/;
    if (!hexPattern.test(textColor) || !hexPattern.test(bgColor)) {
        alert("Please enter valid hex color codes.");
        return;
    }

    const textColorRgb = hexToRgb(textColor);
    const bgColorRgb = hexToRgb(bgColor);

    const contrastRatio = getContrastRatio(textColorRgb, bgColorRgb).toFixed(2);

    // Display the result
    const result = document.getElementById('result');
    result.textContent = `Contrast Ratio: ${contrastRatio}`;

    // Update preview
    const preview = document.getElementById('preview');
    preview.style.color = textColor;
    preview.style.backgroundColor = bgColor;

    // Add a rating for the contrast ratio
    let rating;
    if (contrastRatio < 3) {
        rating = "Poor contrast";
    } else if (contrastRatio < 4.5) {
        rating = "Fair contrast";
    } else if (contrastRatio < 7) {
        rating = "Good contrast";
    } else {
        rating = "Excellent contrast";
    }

    result.textContent += ` - ${rating}`;
});
