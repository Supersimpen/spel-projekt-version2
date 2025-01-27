document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        attack();
    }
});
function attack() {
    // Create an attack object or area in front of the player
    const attackArea = {
        x: player.x + player.width, // Adjust based on your player dimensions
        y: player.y,
        width: 50, // Width of the attack area
        height: player.height // Height of the attack area
    };

    // Check for collision with enemies
    enemies.forEach((enemy, index) => {
        if (isColliding(attackArea, enemy)) {
            // Remove the enemy if there's a collision
            enemies.splice(index, 1);
        }
    });
}
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}
