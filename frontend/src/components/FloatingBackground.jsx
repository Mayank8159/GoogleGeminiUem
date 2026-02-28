import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

const FloatingBackground = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 30;

    // Google Gemini Colors
    const colors = [0x4285F4, 0xF4B400, 0xDB4437, 0x0F9D58]; // Blue, Yellow, Red, Green

    // Create floating objects
    const objects = [];
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.IcosahedronGeometry(1.5 + Math.random() * 1.5, 3);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        wireframe: Math.random() > 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 60;
      mesh.position.y = (Math.random() - 0.5) * 60;
      mesh.position.z = (Math.random() - 0.5) * 40;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        originalPosition: new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z),
        velocityX: (Math.random() - 0.5) * 0.05,
        velocityY: (Math.random() - 0.5) * 0.05,
        velocityZ: (Math.random() - 0.5) * 0.05,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        },
      };

      scene.add(mesh);
      objects.push(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      objects.forEach((obj) => {
        obj.position.x += obj.userData.velocityX;
        obj.position.y += obj.userData.velocityY;
        obj.position.z += obj.userData.velocityZ;

        // Gentle oscillation
        obj.position.x += Math.sin(Date.now() * 0.0003 + obj.userData.originalPosition.x) * 0.001;
        obj.position.y += Math.cos(Date.now() * 0.0003 + obj.userData.originalPosition.y) * 0.001;

        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;

        // Keep objects in bounds with wrapping
        const bounds = 40;
        if (obj.position.x > bounds) obj.position.x = -bounds;
        if (obj.position.x < -bounds) obj.position.x = bounds;
        if (obj.position.y > bounds) obj.position.y = -bounds;
        if (obj.position.y < -bounds) obj.position.y = bounds;
        if (obj.position.z > 30) obj.position.z = -30;
        if (obj.position.z < -30) obj.position.z = 30;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{
        background: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
          ? 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.4) 100%)'
          : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 0%, rgba(248, 249, 250, 0.4) 100%)',
      }}
    />
  );
};

export default FloatingBackground;
