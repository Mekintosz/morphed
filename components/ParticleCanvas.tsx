import React, { useEffect, useRef } from "react";

export interface ParticleCanvasProps {
	/**
	 * Number of particles to render
	 * @default 400
	 */
	particleCount?: number;
	/**
Color palette for particles (RGB strings without 'rgba')
   @default ["0, 240, 255", "0, 102, 255"] (Cyan and Blue)
    @example ["255, 0, 0", "0, 255, 0"] for red and green
  
    colors?: string[];
    /**
     * Minimum particle speed
     * @default 0.2
     */
	minSpeed?: number;
	/**
	 * Maximum particle speed
	 * @default 0.7
	 */
	maxSpeed?: number;
	/**
	 * Minimum particle size in pixels
	 * @default 0.5
	 */
	minSize?: number;
	/**
	 * Maximum particle size in pixels
	 * @default 3.5
	 */
	maxSize?: number;
	/**
	 * Minimum opacity (0-1)
	 * @default 0.1
	 */
	minOpacity?: number;
	/**
	 * Maximum opacity (0-1)
	 * @default 0.6
	 */
	maxOpacity?: number;
	/**
	 * Additional CSS classes for the canvas element
	 */
	className?: string;
}

class Particle {
	x: number;
	y: number;
	angle: number;
	speed: number;
	size: number;
	color: string;
	opacity: number;

	constructor(
		w: number,
		h: number,
		colors: string[],
		minSpeed: number,
		maxSpeed: number,
		minSize: number,
		maxSize: number,
		minOpacity: number,
		maxOpacity: number,
	) {
		this.x = w / 2;
		this.y = h / 2;
		this.angle = Math.random() * Math.PI * 2;
		this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		this.size = Math.random() * (maxSize - minSize) + minSize;
		this.color = colors[Math.floor(Math.random() * colors.length)];
		this.opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
	}

	update(w: number, h: number) {
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;

		// Reset if out of bounds
		if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
			this.x = w / 2;
			this.y = h / 2;
			this.angle = Math.random() * Math.PI * 2;
		}
	}

	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = `rgba(${this.color}, ${this.opacity})`;
		// Use fillRect for a more digital/pixelated look
		context.fillRect(this.x, this.y, this.size, this.size);
	}
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
	particleCount = 160,
	colors = ["0, 240, 255", "0, 102, 255"],
	minSpeed = 0.2,
	maxSpeed = 0.7,
	minSize = 0.5,
	maxSize = 3.5,
	minOpacity = 0.1,
	maxOpacity = 0.6,
	className = "",
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let particles: Particle[] = [];

		const init = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.offsetWidth;
				canvas.height = parent.offsetHeight;
			}

			particles = [];

			for (let i = 0; i < particleCount; i++) {
				const p = new Particle(
					canvas.width,
					canvas.height,
					colors,
					minSpeed,
					maxSpeed,
					minSize,
					maxSize,
					minOpacity,
					maxOpacity,
				);
				// Pre-distribute particles so they don't all start at the center
				const maxDist = Math.max(canvas.width, canvas.height) / 2;
				const dist = Math.random() * maxDist;
				p.x += Math.cos(p.angle) * dist;
				p.y += Math.sin(p.angle) * dist;
				particles.push(p);
			}
		};

		const animate = () => {
			if (!ctx || !canvas) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((p) => {
				p.update(canvas.width, canvas.height);
				p.draw(ctx);
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		init();
		window.addEventListener("resize", init);
		animate();

		return () => {
			window.removeEventListener("resize", init);
			cancelAnimationFrame(animationFrameId);
		};
	}, [
		particleCount,
		colors,
		minSpeed,
		maxSpeed,
		minSize,
		maxSize,
		minOpacity,
		maxOpacity,
	]);

	return <canvas ref={canvasRef} className={className} />;
};
