var Configuration = {
    PIXELS_PER_UNIT_LENGTH: 10.0,
    FORCE_CONSTANT: 500.0,
    SLEEP_TIME: 10,
    TIME_STEP: 0.01,
    MINIMUM_PARTICLE_MASS: 10.0,
    MAXIMUM_PARTICLE_MASS: 30.0,
    MAXIMUM_INITIAL_VELOCITY: 40.0,
    DEFAULT_NUMBER_OF_PARTICLES: 10
};

function Particle(mass, radius) {
    this.mass = mass;
    this.radius = radius;
    this.x = 0.0;
    this.y = 0.0;
    this.velocityX = 0.0;
    this.velocityY = 0.0;
}

Particle.prototype.getMass = function() {
    return this.mass;
};

Particle.prototype.getX = function() {
    return this.x;
};

Particle.prototype.getY = function() {
    return this.y;
};

Particle.prototype.getVelocityX = function() {
    return this.velocityX;
};

Particle.prototype.getVelocityY = function() {
    return this.velocityY;
};

Particle.prototype.setX = function(x) {
    this.x = x;
};

Particle.prototype.setY = function(y) {
    this.y = y;
};

Particle.prototype.setVelocityX = function(velocityX) {
    this.velocityX = velocityX;
};

Particle.prototype.setVelocityY = function(velocityY) {
    this.velocityY = velocityY;
};

Particle.prototype.getSpeed = function() {
    var vxSquared = this.velocityX * this.velocityX;
    var vySquared = this.velocityY * this.velocityY;
    return Math.sqrt(vxSquared + vySquared);
};

Particle.prototype.getDistance = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Particle.prototype.getKineticEnergy = function() {
    var speed = this.getSpeed();
    return 0.5 * this.mass * speed * speed;
};

Particle.prototype.getRadius = function() {
    return this.radius;
};

function getForce(particle1, particle2) {
    var distance = particle1.getDistance(particle2);
    var mass1 = particle1.getMass();
    var mass2 = particle2.getMass();
    return Configuration.FORCE_CONSTANT * mass1 * mass2 / (distance * distance);
}

function getForceVector(particle1, particle2) {
    var vectorLength = getForce(particle1, particle2);
    var dx = particle1.getX() - particle2.getX();
    var dy = particle1.getY() - particle2.getY();
    var angle = Math.atan2(dy, dx);
    var xComponent = vectorLength * Math.cos(angle);
    var yComponent = vectorLength * Math.sin(angle);
    return new Vector(xComponent, yComponent);
}

function getPotentialEnergy(particle1, particle2) {
    var mass1 = particle1.getMass();
    var mass2 = particle2.getMass();
    var distance = particle1.getDistance(particle2);
    return Configuration.FORCE_CONSTANT * mass1 * mass2 / distance;
}

function ParticleRenderer(particle, color, canvasContext) {
    this.particle = particle;
    this.color = color;
    this.canvasContext = canvasContext;
}

ParticleRenderer.prototype.draw = function() {
    var effectiveX = this.particle.getX() * Configuration.PIXELS_PER_UNIT_LENGTH;
    var effectiveY = this.particle.getY() * Configuration.PIXELS_PER_UNIT_LENGTH;
    
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.beginPath();
    this.canvasContext.arc(effectiveX, 
                           effectiveY, 
                           this.particle.getRadius() * 
                                   Configuration.PIXELS_PER_UNIT_LENGTH, 
                           0, 
                           2 * Math.PI, 
                           false);
    this.canvasContext.fill();
};

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.getX = function() {
    return this.x;
};

Vector.prototype.getY = function() {
    return this.y;
};

Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.multiply = function(factor) {
    return new Vector(this.x * factor, this.y * factor);
};

function getParticleForce(particle1, particle2) {
    var distance = particle1.getDistance(particle2);
    var mass1 = particle1.getMass();
    var mass2 = particle2.getMass();
    return Configuration.FORCE_CONSTANT * mass1 * mass2 / (distance * distance);
}

function getPotentialEnergy(particle1, particle2) {
    var mass1 = particle1.getMass();
    var mass2 = particle2.getMass();
    var distance = particle1.getDistance(particle2);
    return Configuration.FORCE_CONSTANT * mass1 * mass2 / distance;
}

function SimulationEngine(canvasContext, 
                          canvasElement,
                          particles,
                          renderers,
                          timeStep,
                          worldWidth,
                          worldHeight,
                          sleepTime) {
    this.canvasContext            = canvasContext;
    this.canvasElement            = canvasElement;
    this.particles                = particles;
    this.renderers                = renderers;
    this.timeStep                 = timeStep;
    this.totalEnergy              = null;
    this.worldWidth               = worldWidth;
    this.worldHeight              = worldHeight;
    this.sleepTime                = sleepTime;
    this.exit                     = false;
    this.pause                    = true;
    this.particleToForceVectorMap = {};
}

SimulationEngine.prototype.togglePause = function() {
    this.pause = !this.pause;
};

SimulationEngine.prototype.run = function() {
    this.redraw();
    this.totalEnergy = this.computeTotalEnergy();
    var self = this;
    
    setInterval(function() {
        if (!self.pause) {
            self.performStep();
            self.redraw();
        }
    }, this.sleepTime);
};

SimulationEngine.prototype.performStep = function() {
    this.computeForceVectors();
    this.updateParticleVelocities();
    this.moveParticles();
    this.resolveWorldBorderCollisions();
    this.normalizeVelocityVectors();
    this.particleToForceVectorMap = {};
};

SimulationEngine.prototype.redraw = function() {
    this.canvasContext.fillStyle = "#000";
    this.canvasContext.fillRect(0, 
                                0, 
                                this.canvasElement.width, 
                                this.canvasElement.height);
    
    for (var i = 0; i < this.renderers.length; ++i) {
        var renderer = this.renderers[i];
        renderer.draw();
    }
    
    this.canvasContext.fillStyle = "#fff";
    this.font = "20px Arial";
    this.canvasContext.fillText("Total energy: " + this.computeTotalEnergy(), 
                                0, 
                                30);
};

SimulationEngine.prototype.computeForceVectors = function() {
    this.particleToForceVectorMap = [];
    
    for (var i = 0; i < this.particles.length; ++i) {
        var particle = this.particles[i];
        var vector = new Vector(0.0, 0.0);
        
        for (var j = 0; j < this.particles.length; ++j) {
            var otherParticle = this.particles[j];
            
            if (i === j) {
                continue;
            }
            
            var aux = getForceVector(particle, otherParticle);
            vector = vector.plus(aux);
        }
        
        this.particleToForceVectorMap.push([particle, vector]);
    }
};

SimulationEngine.prototype.updateParticleVelocities = function() {
    for (var i = 0; i < this.particleToForceVectorMap.length; ++i) {
        var particle = this.particleToForceVectorMap[i][0];
        var vector   = this.particleToForceVectorMap[i][1];
            
        vector = vector.multiply(1.0 / particle.getMass());
        particle.setVelocityX(particle.getVelocityX() + vector.getX() * this.timeStep);
        particle.setVelocityY(particle.getVelocityY() + vector.getY() * this.timeStep);
    }
};

SimulationEngine.prototype.moveParticles = function() {
    for (var i = 0; i < this.particles.length; ++i) {
        var particle = this.particles[i];
        particle.setX(particle.getX() + particle.getVelocityX() * this.timeStep);
        particle.setY(particle.getY() + particle.getVelocityY() * this.timeStep);
    }
};

SimulationEngine.prototype.resolveWorldBorderCollisions = function() {
    for (var i = 0; i < this.particles.length; ++i) {
        var particle = this.particles[i];
        var radius = particle.getRadius();
        
        if (particle.getY() - radius <= 0.0) {
            particle.setVelocityY(-particle.getVelocityY());
        } else if (particle.getY() + radius >= this.worldHeight) {
            particle.setVelocityY(-particle.getVelocityY());
        }
        
        if (particle.getX() - radius <= 0.0) {
            particle.setVelocityX(-particle.getVelocityX());
        } else if (particle.getX() + radius >= this.worldWidth) {
            particle.setVelocityX(-particle.getVelocityX());
        }
    }
};

SimulationEngine.prototype.normalizeVelocityVectors = function() {
    var totalEnergyDelta = this.computeTotalEnergyDelta();
    var factor = this.getNormalizationFactor(totalEnergyDelta);
    
    for (var i = 0; i < this.particles.length; ++i) {
        var particle = this.particles[i];
        particle.setVelocityX(factor * particle.getVelocityX());
        particle.setVelocityY(factor * particle.getVelocityY());
    }
};

SimulationEngine.prototype.getNormalizationFactor = function(totalEnergyDelta) {
    var aux = totalEnergyDelta / this.computeTotalKineticEnergy() + 1.0;
    
    if (aux < 0.0) {
        console.log("aux: " + aux);
    }
    
    return Math.sqrt(aux);
};

SimulationEngine.prototype.computeTotalKineticEnergy = function() {
    var energy = 0.0;
    for (var i = 0; i < this.particles.length; ++i) {
        var particle = this.particles[i];
        energy += particle.getKineticEnergy();
    }
    
    return energy;
};

SimulationEngine.prototype.computeTotalEnergyDelta = function() {
    return this.totalEnergy - this.computeTotalEnergy();
};

SimulationEngine.prototype.computeTotalEnergy = function() {
    var totalEnergy = 0.0;
    
    for (var i = 0; i < this.particles.length; ++i) {
        totalEnergy += this.particles[i].getKineticEnergy();
    }
    
    for (var i = 0; i < this.particles.length; ++i) {
        var particle1 = this.particles[i];
        
        for (var j = i + 1; j < this.particles.length; ++j) {
            var particle2 = this.particles[j];
            totalEnergy += getPotentialEnergy(particle1, particle2);
        }
    }
    
    return totalEnergy;
};

function setCanvasDimensions(canvasElement) {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
}

function createRandomParticles(number_of_particles, 
                               worldWidth, 
                               worldHeight,
                               canvasContext) {
    var particleData = [];
    
    for (var i = 0; i < number_of_particles; ++i) {
        particleData.push(createRandomParticleData(worldWidth, 
                                                   worldHeight, 
                                                   canvasContext));
    }
    
    return particleData;
}

function getRandomColor() {
    var letters = "0123456789abcdef";
    var color = "#";
    
    for (var i = 0; i < 6; ++i) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

function createRandomParticleData(worldWidth, worldHeight, canvasContext) {
    var mass = Configuration.MINIMUM_PARTICLE_MASS + 
              (Configuration.MAXIMUM_PARTICLE_MASS - Configuration.MINIMUM_PARTICLE_MASS) 
             * Math.random();
    var radius = mass / Configuration.PIXELS_PER_UNIT_LENGTH;
    var particle = new Particle(mass, radius);
    particle.setX(worldWidth * Math.random());
    particle.setY(worldHeight * Math.random());
    particle.setVelocityX(Configuration.MAXIMUM_INITIAL_VELOCITY * Math.random());
    particle.setVelocityY(Configuration.MAXIMUM_INITIAL_VELOCITY * Math.random());
    var color = getRandomColor();
    var renderer = new ParticleRenderer(particle, color, canvasContext);
    return [particle, renderer];
}

function extractParticles(particleData) {
    particles = [];
    
    for (var i = 0; i < particleData.length; ++i) {
        particles.push(particleData[i][0]);
    }
    
    return particles;
}

function extractRenderers(particleData) {
    particles = [];
    
    for (var i = 0; i < particleData.length; ++i) {
        particles.push(particleData[i][1]);
    }
    
    return particles;
}

function main() {
    var canvasElement = document.getElementById("cnvs");
    setCanvasDimensions(canvasElement);
    var canvasContext = canvasElement.getContext("2d");
    
    var worldWidth  = canvasElement.width  / Configuration.PIXELS_PER_UNIT_LENGTH;
    var worldHeight = canvasElement.height / Configuration.PIXELS_PER_UNIT_LENGTH;
    
    var particleData = 
            createRandomParticles(Configuration.DEFAULT_NUMBER_OF_PARTICLES,
                                  worldWidth,
                                  worldHeight,
                                  canvasContext);
                                  
    var particles = extractParticles(particleData);
    var renderers = extractRenderers(particleData);
    
    var simulationEngine = new SimulationEngine(canvasContext,
                                                canvasElement,
                                                particles,
                                                renderers,
                                                Configuration.TIME_STEP,
                                                worldWidth,
                                                worldHeight,
                                                Configuration.SLEEP_TIME);
    window.onkeydown = function(e) {
        if (e.keyCode === 32) {
            simulationEngine.togglePause();
        }
    };                               
    
    simulationEngine.run();
}

main();