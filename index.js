import { getContext, FPS } from "./utils-module.js";

document.title = "A01 - App Graphics 2D (Modified)";
document.addEventListener("DOMContentLoaded", main);

let sunAngle = 0;
let clouds = [
	{ x: 150, y: 100, scale: 1.3, speed: 1.5 },
	{ x: 500, y: 70, scale: 0.9, speed: 0.15 },
	{ x: 900, y: 130, scale: 1.6, speed: 0.25 },
];

// วาดเมฆ
function drawCloud(ctx, x, y, scale = 1) {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "#aaaaaa";
	ctx.lineWidth = 1;

	ctx.arc(x, y, 22 * scale, 0, Math.PI * 2);
	ctx.arc(x + 30 * scale, y - 15 * scale, 28 * scale, 0, Math.PI * 2);
	ctx.arc(x + 65 * scale, y, 22 * scale, 0, Math.PI * 2);
	ctx.arc(x + 35 * scale, y + 15 * scale, 26 * scale, 0, Math.PI * 2);

	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function main() {
	const ctx = getContext("#myCanvas");

	const config = {
		width: 1400,
		height: 600,
		bgColor: "lightblue",
		debug: true,
	};

	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

	function draw() {
		FPS.update();

		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);

		// 🌥️ วาดเมฆ
		clouds.forEach(cloud => {
			drawCloud(ctx, cloud.x, cloud.y, cloud.scale);
			cloud.x += cloud.speed;
			if (cloud.x - 100 > config.width) {
				cloud.x = -200;
			}
		});

		// พื้นดิน
		ctx.fillStyle = "#228B22";
		ctx.fillRect(0, 520, config.width, 80);

		// ภูเขา
		ctx.beginPath();
		ctx.arc(300, 520, 250, Math.PI, 0);
		ctx.fillStyle = "#014d26";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(700, 520, 200, Math.PI, 0);
		ctx.fillStyle = "#026c34";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(1100, 520, 270, Math.PI, 0);
		ctx.fillStyle = "#017a3d";
		ctx.fill();

		// บ้าน
		ctx.fillStyle = "#b5651d";
		ctx.fillRect(550, 360, 180, 160);

		// หลังคา
		ctx.beginPath();
		ctx.moveTo(540, 360);
		ctx.lineTo(740, 360);
		ctx.lineTo(640, 240);
		ctx.closePath();
		ctx.fillStyle = "#a52a2a";
		ctx.fill();

		// ประตู
		ctx.fillStyle = "#5c3317";
		ctx.fillRect(610, 440, 40, 80);

		// หน้าต่าง
		ctx.fillStyle = "#87ceeb";
		ctx.fillRect(565, 380, 40, 40);
		ctx.fillRect(670, 380, 40, 40);

		// ต้นไม้
		ctx.fillStyle = "#8b4513";
		ctx.fillRect(200, 400, 30, 120);
		ctx.beginPath();
		ctx.fillStyle = "green";
		ctx.arc(215, 370, 50, 0, Math.PI * 2);
		ctx.arc(185, 340, 40, 0, Math.PI * 2);
		ctx.arc(245, 340, 40, 0, Math.PI * 2);
		ctx.fill();

		// ดวงอาทิตย์
		ctx.beginPath();
		ctx.fillStyle = "yellow";
		ctx.arc(1150, 100, 45, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();

		// รังสีดวงอาทิตย์แบบยาวสั้นสลับ
		ctx.save();
		ctx.translate(1150, 100);
		ctx.rotate(sunAngle);
		for (let i = 0; i < 16; i++) {
			let len = i % 2 === 0 ? 70 : 50;
			ctx.beginPath();
			ctx.moveTo(50, 0);
			ctx.lineTo(len, 0);
			ctx.strokeStyle = "gold";
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.rotate(Math.PI / 8);
		}
		ctx.restore();
		sunAngle += 0.01;

// 🌊 แม่น้ำไหลจากภูเขาทางขวา
ctx.beginPath();
ctx.moveTo(950, 500);   // เริ่มจากเชิงเขาทางขวา

// โค้งแรก (จากเขาลงมา)
ctx.bezierCurveTo(920, 530, 1000, 560, 880, 580);

// โค้งกลาง (เริ่มกว้างขึ้น)
ctx.bezierCurveTo(800, 600, 950, 640, 850, 670);

// ปากแม่น้ำกว้างออกด้านล่าง
ctx.lineTo(1100, 670);
ctx.bezierCurveTo(1050, 630, 1180, 600, 1000, 560);
ctx.bezierCurveTo(940, 540, 980, 520, 950, 500);

ctx.closePath();
ctx.fillStyle = "#4fa9f7"; // สีน้ำ
ctx.fill();

ctx.strokeStyle = "#2c6fb3"; // ขอบน้ำ
ctx.lineWidth = 2;
ctx.stroke();




		// แปลงผัก (วงกลมแทนสี่เหลี่ยม)
		ctx.fillStyle = "#8b5a2b";
		ctx.fillRect(400, 520, 120, 80);
		ctx.fillStyle = "#32cd32";
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 3; j++) {
				ctx.beginPath();
				ctx.arc(420 + i * 25, 540 + j * 20, 8, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		if (config.debug) FPS.show(ctx, 10, 28);
		requestAnimationFrame(draw);
	}
	draw();
}
