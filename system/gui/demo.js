"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('demo-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get 2D context from canvas!');
        return;
    }
    const screenWidth = canvas.width = window.innerWidth;
    const screenHeight = canvas.height = window.innerHeight;
    let demoTime = 0;
    function updateDemo(deltaTime) {
        demoTime += deltaTime;
        // Clear screen
        if (ctx) {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, screenWidth, screenHeight);
            // Example: Drawing a rotating rectangle
            const centerX = screenWidth / 2;
            const centerY = screenHeight / 2;
            const size = 100;
            const angle = demoTime / 1000; // Rotate 1 full rotation every 1000ms (1 second)
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            ctx.fillStyle = '#f00';
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.restore();
            // Example: Drawing text
            ctx.fillStyle = '#fff';
            ctx.font = '24px Arial';
            ctx.fillText('Commodore Amiga Demo', 20, 50);
        }
        // Request next frame
        requestAnimationFrame(update);
    }
    function update(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        updateDemo(deltaTime);
        // Uncomment below to limit the frame rate (e.g., 60 FPS)
        // setTimeout(() => requestAnimationFrame(update), 1000 / 60);
        requestAnimationFrame(update);
    }
    let lastTime = performance.now();
    update(lastTime);
});
