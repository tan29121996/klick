import { useState, useEffect, useRef } from 'react';
import {collisions} from '../data/collisions';
import {battles} from '../data/battles';
import { gsap } from 'gsap';

function Game() {
  const canvasRef = useRef(null);

  const [isActive, setIsActive] = useState(0);
  const [player, setPlayer] = useState();
  const [enemy, setEnemy] = useState();
  const [render, setRender] = useState([]);
  const [isStunned, setStunned] = useState(false);
  const [inCombat, setInCombat] = useState(false);
  const [enemyTurn, setEnemyTurn] = useState(false);

  const collisionsMap = []
  for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
  }

  const battlesMap = []
  for (let i = 0; i < battles.length; i += 70) {
    battlesMap.push(battles.slice(i, 70 + i));
  }

  function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
  }

  const keys = {
    w : {
      pressed: false
    },
    a : {
      pressed: false
    },
    s : {
      pressed: false
    },
    d : {
      pressed: false
    }
  }

    let lastKey = '';

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w':
          keys.w.pressed = true;
          lastKey = 'w';
          break;
        case 'a':
          keys.a.pressed = true;
          lastKey = 'a';
          break;
        case 's':
          keys.s.pressed = true;
          lastKey = 's';
          break;
        case 'd':
          keys.d.pressed = true;
          lastKey = 'd';
          break;
      }
    })

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'w':
          keys.w.pressed = false;
          break;
        case 'a':
          keys.a.pressed = false;
          break;
        case 's':
          keys.s.pressed = false;
          break;
        case 'd':
          keys.d.pressed = false;
          break;
      }
    })

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    const image = new Image();
    image.src = '/images/Assets/game/RPG Map.png';

    const foregroundImage = new Image();
    foregroundImage.src = '/images/Assets/game/foregroundObjects.png';

    const playerUpImage = new Image();
    playerUpImage.src = '/images/Assets/game/playerUp 4.png';

    const playerLeftImage = new Image();
    playerLeftImage.src = '/images/Assets/game/playerLeft 4.png';

    const playerRightImage = new Image();
    playerRightImage.src = '/images/Assets/game/playerRight 4.png';

    const playerDownImage = new Image();
    playerDownImage.src = '/images/Assets/game/playerDown 4.png';

    class Sprite {
      constructor({
        position,
        image,
        frames = { max: 1, hold: 8 },
        sprites,
        animate = false,
        isEnemy = false,
        rotation = 0
      }) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0 };

        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        }
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.health = 90;
        this.isEnemy = isEnemy;
        this.rotation = rotation;
      }

      faint() {
        gsap.to(this.position, {
          y: this.position.y + 20
        })
        gsap.to(this, {
          opacity: 0
        })
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId);
            animate();
            document.querySelector('#userInterface').style.display = 'none';
            gsap.to('#overlappingDiv', {
              opacity: 0
            })
            battling.initiated = false;
            setInCombat(false);
          }
        })
      }

      draw() {
        c.save();
        c.translate(
          this.position.x + this.width / 2,
          this.position.y + this.height / 2
        );
        c.rotate(this.rotation);
        c.translate(
          -this.position.x - this.width / 2,
          -this.position.y - this.height / 2
        );
        c.globalAlpha = this.opacity;
        c.drawImage(
          this.image,
          this.frames.val * this.width,
          0,
          this.image.width / this.frames.max,
          this.image.height,
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );
        c.restore();

        if (!this.animate) return

        if (this.frames.max > 1) {
          this.frames.elapsed++;
        }
         if (this.frames.elapsed % this.frames.hold === 0) {
           if (this.frames.val < this.frames.max - 1) this.frames.val++;
           else this.frames.val = 0;
         }
      }
      attack({ attack, recipient, render }) {
        let healthBar = '#enemyHealthBar';
        if (this.isEnemy) healthBar = '#playerHealthBar';

        let rotation = 0.95;
        if (this.isEnemy) rotation = -2.1;

        recipient.health -= attack.damage;
        recipient.health += attack.recover;

        switch (attack.name) {
          case 'Slash':
            const slashImage = new Image();
            slashImage.src = '/images/Assets/game/slash.png';
            const slash = new Sprite({
              position: {
                x: this.position.x + 10,
                y: this.position.y
              },
              image: slashImage,
              frames: {
                max: 4,
                hold: 10
              },
              animate: true,
              rotation
            })
            render.splice(1, 0, slash);

            gsap.to(slash.position, {
              x: recipient.position.x - 10,
              y: recipient.position.y,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })

                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })

                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
                render.splice(1, 1)
              }
            })
            break
          case 'Heal':
            healthBar = '#playerHealthBar';
            const healImage = new Image();
            healImage.src = '/images/Assets/game/heal.png';
            const heal = new Sprite({
              position: {
                x: this.position.x + 10,
                y: this.position.y
              },
              image: healImage,
              frames: {
                max: 4,
                hold: 10
              },
              animate: true,
              rotation
            })
            render.splice(1, 0, heal);

            gsap.to(heal.position, {
              x: recipient.position.x + 10,
              y: recipient.position.y,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })

                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 3,
                  yoyo: true,
                  duration: 0.08
                })

                render.splice(1, 1)
              }
            })
            break
          case 'Counter':
            const hitImage = new Image();
            hitImage.src = '/images/Assets/game/hit.png';
            const hit = new Sprite({
              position: {
                x: recipient.position.x + 15,
                y: recipient.position.y
              },
              image: hitImage,
              frames: {
                max: 2,
                hold: 12
              },
              animate: true,
              rotation
            })
            render.splice(1, 0, hit);

            gsap.to(hit.position, {
              x: recipient.position.x + 15,
              y: recipient.position.y,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })

                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })

                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
                render.splice(1, 1)
              }
            })
            break
          case 'Stun':
            healthBar = '#enemyHealthBar';
            const stunImage = new Image();
            stunImage.src = '/images/Assets/game/stun 2.png';
            const stun = new Sprite({
              position: {
                x: this.position.x + 10,
                y: this.position.y
              },
              image: stunImage,
              frames: {
                max: 5,
                hold: 10
              },
              animate: true,
              rotation
            })

            render.splice(1, 0, stun);

            gsap.to(stun.position, {
              x: recipient.position.x + 10,
              y: recipient.position.y,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })

                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })

                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })

                render.splice(1, 1)
              }
            })
            break
          case 'Demon':
            const fireImage = new Image();
            fireImage.src = '/images/Assets/game/fireball 3.png';
            const fire = new Sprite({
              position: {
                x: this.position.x - 15,
                y: this.position.y
              },
              image: fireImage,
              frames: {
                max: 4,
                hold: 10
              },
              animate: true,
              rotation
            })
            render.splice(1, 0, fire);

            gsap.to(fire.position, {
              x: recipient.position.x,
              y: recipient.position.y + 15,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: recipient.health + '%'
                })

                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08
                })

                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08
                })
                render.splice(1, 1)
              }
            })
            break
          }
      }
    }

    class Boundary {
      static width = 16;
      static height = 16;
      constructor({ position }) {
        this.position = position;
        this.width = 16;
        this.height = 16;
      }

      draw() {
        c.fillStyle = 'transparent';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    class Battle {
      static width = 16;
      static height = 16;
      constructor({ position, image, fought = false }) {
        this.position = position;
        this.image = image;
        this.fought = fought;
        this.width = 16;
        this.height = 16;
      }

      draw() {
        c.save();
        c.globalAlpha = this.opacity;
        c.drawImage(
          this.image,
          0,
          0,
          this.image.width,
          this.image.height,
          this.position.x,
          this.position.y,
          this.image.width,
          this.image.height
        );
        c.restore();
      }
    }

    const player = new Sprite({
      position: {
        x: canvas.width / 2 - 96 / 4 / 2,
        y: canvas.height / 2 - 34 / 2
      },
      image: playerDownImage,
      frames: {
        max: 4,
        hold: 8
      },
      sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
      }
    })

    const boundaries = [];

    const offset = {
      x: -530,
      y: -1200
    }

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1089)
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
              }
            })
          )
      })
    })

    const battleZones = [];

    const enemyImage = new Image();
    enemyImage.src = '/images/Assets/game/demon 3.png';
    battlesMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1089)
          battleZones.push(
            new Battle({
              position: {
                x: j * Battle.width + offset.x,
                y: i * Battle.height + offset.y
              },
              image: enemyImage
            })
          )
      })
    })

    const background = new Sprite({
      position: {
        x : offset.x,
        y : offset.y
      },
      image: image
    })

    const foreground = new Sprite({
      position: {
        x : offset.x,
        y : offset.y
      },
      image: foregroundImage
    })

    const movables = [
      background,
      ...boundaries,
      foreground,
      ...battleZones
    ]

    const battling = { initiated: false };

    const animate = () => {
      const animationId = window.requestAnimationFrame(animate);
      background.draw();
      boundaries.forEach((boundary) => {
        boundary.draw();
      })
      battleZones.forEach(battle => {
        battle.draw();
      })
      player.draw();
      foreground.draw();

      let moving = true;
      player.animate = false;

      if (battling.initiated) return

      const transparentImage = new Image();
      transparentImage.src = '/images/Assets/game/transparent.png';

      if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
          const battle = battleZones[i];

          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: battle
            }) && battle.fought === false)
            {

            window.cancelAnimationFrame(animationId);

            battling.initiated = true;
            battle.fought = true;

            gsap.to('#overlappingDiv', {
              opacity: 1,
              repeat: 3,
              yoyo: true,
              duration: 0.4,
              onComplete() {
                gsap.to('#overlappingDiv', {
                  opacity: 1,
                  duration: 0.4,
                  onComplete() {
                    initBattle();
                    animateBattle();
                    gsap.to('#overlappingDiv', {
                      opacity: 0,
                      duration: 0.4
                    })
                  }
                })
              }
            });

            battle.image = transparentImage;

            break
          }
        }
      }

      if (keys.w.pressed && lastKey === 'w') {
        player.animate = true;
        player.image = player.sprites.up;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 1.5
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.y += 1.5;
          }
        )
      }
      else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true;
        player.image = player.sprites.left;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 1.5,
                  y: boundary.position.y
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.x += 1.5;
          }
        )
      }
      else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 1.5
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.y -= 1.5;
          }
        )
      }
      else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 1.5,
                  y: boundary.position.y
                }
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.x -= 1.5;
          }
        )
      }
    }

    animate();

    const battleBackgroundImage = new Image();
    battleBackgroundImage.src = '/images/Assets/game/battleBackground 2.png';
    const battleBackground = new Sprite({
      position: {
        x: 0,
        y: 0
      },
      image: battleBackgroundImage
    })

    const knightImage = new Image();
    knightImage.src = '/images/Assets/game/Knight 3.png';
    const knight = new Sprite({
      position: {
        x: 55,
        y: 65
      },
      image: knightImage,
      frames: {
        max: 4,
        hold: 20
      },
      animate: true
    })

    let battleAnimationId;
    let renderedSprites;
    let demon;

    function initBattle() {
      setInCombat(true);
      setEnemyTurn(false);

      document.querySelector('#userInterface').style.display = 'block';
      document.querySelector('#enemyHealthBar').style.width = '90%';

      const demonImage = new Image();
      demonImage.src = '/images/Assets/game/demon 2.png';

      demon = new Sprite({
        position: {
          x: 180,
          y: 5
        },
        image: demonImage,
        frames: {
          max: 4,
          hold: 20
        },
        animate: true,
        isEnemy: true
      })

      renderedSprites = [demon, knight];

      setEnemy(demon);
      setPlayer(knight);
      setRender(renderedSprites);
    }

    function animateBattle() {
      battleAnimationId = window.requestAnimationFrame(animateBattle);
      battleBackground.draw();
      renderedSprites.forEach((sprite) => {
        sprite.draw()
      })
    }
  }, []);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const slash = async event => {
    if (inCombat === true) {
      if (enemyTurn === false) {
        player.attack({
          attack: {
            name: 'Slash',
            damage: 18,
            recover: 0,
            type: 'Normal'
          },
          recipient: enemy,
          render
        })

        setStunned(false);
        setEnemyTurn(true);

        await delay(1500);

        if (enemy.health <= 0) {
          enemy.faint();
          return
        }

        enemyAttack();
      }
    }
  }

  const heal = async event => {
    if (inCombat === true) {
      if (enemyTurn === false) {
        if (player.health + 45 > 90) {
          player.attack({
            attack: {
              name: 'Heal',
              damage: 0,
              recover: 90 - player.health,
              type: 'Normal'
            },
            recipient: player,
            render
          })
        } else {
          player.attack({
            attack: {
              name: 'Heal',
              damage: 0,
              recover: 45,
              type: 'Normal'
            },
            recipient: player,
            render
          })
        }

        setStunned(false);
        setEnemyTurn(true);

        await delay(1500);

        enemyAttack();
      }
    }
  }

  const counter = async event => {
    if (inCombat === true) {
      if (enemyTurn === false) {
        enemy.attack({
          attack: {
            name: 'Counter',
            damage: 5,
            recover: 0,
            type: 'Normal'
          },
          recipient: player,
          render
        })

        setStunned(false);
        setEnemyTurn(true);

        await delay(1000);

        player.attack({
          attack: {
            name: 'Counter',
            damage: 9,
            recover: 0,
            type: 'Normal'
          },
          recipient: enemy,
          render
        })

        await delay(1500);

        if (enemy.health <= 0) {
          enemy.faint();
          return
        }

        setEnemyTurn(false);
      }
    }
  }

  const stun = async event => {
    if (inCombat === true) {
      if (enemyTurn === false) {
        if (isStunned === false) {
          enemy.attack({
            attack: {
              name: 'Stun',
              damage: 9,
              recover: 0,
              type: 'Normal'
            },
            recipient: enemy,
            render
          })

          setStunned(true);
          setEnemyTurn(true);

          await delay(1500);

          if (enemy.health <= 0) {
            enemy.faint();
            return
          }

          setEnemyTurn(false);
        }
      }
    }
  }

  const enemyAttack = async event => {
    enemy.attack({
      attack: {
        name: 'Demon',
        damage: 15,
        recover: 0,
        type: 'Normal'
      },
      recipient: player,
      render
    })

    await delay(1200);

    setEnemyTurn(false);
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', fontSize: 22, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          top: -13, color: '#c257eb',
          fontFamily: 'ZCOOL XiaoWei',
          paddingLeft: 10, paddingRight: 10,
          whiteSpace: 'nowrap',
          backgroundColor: '#1e203c' }}>
          A Knight's Tale
        </div>
      </div>
      <div style={{
        width: 610, height: 682,
        border: '2px solid #c257eb',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 15,
        alignItems: 'center' }}
      >
        <div id='overlappingDiv' style={{ position: 'absolute', width: 580, height: 346, opacity: 0, backgroundColor: 'black' }} />

        <div id='userInterface' style={{ display: 'none' }}>
          <div style={{ position: 'absolute', left: 355, top: 100 }}>
            <img style={{
              position: 'absolute',
              width: 250, height: 56,
              opacity: 0.8,
              borderRadius: 10, border: '2px solid #c257eb',
              filter: 'brightness(70%)' }}
              src='/images/Assets/Tabs.png'
            />
            <div style={{
              position: 'absolute',
              width: 250, height: 56,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 14,
              color: 'white' }}
            >
              <div style={{ width: 225, fontFamily: 'ZCOOL XiaoWei' }}>Demon</div>
              <div id='enemyHealthBar' style={{ width: 225, height: 10, marginTop: 9, borderRadius: 5, background: 'linear-gradient(to right, #e5194f, #8e18ee)' }} />
            </div>
          </div>

          <div style={{ position: 'absolute', left: 652, top: 355 }}>
            <img style={{
              position: 'absolute',
              width: 250, height: 56,
              opacity: 0.8,
              borderRadius: 10, border: '2px solid #c257eb',
              filter: 'brightness(70%)' }}
              src='/images/Assets/Tabs.png'
            />
            <div style={{
              position: 'absolute',
              width: 250, height: 56,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 14,
              color: 'white' }}
            >
              <div style={{ width: 225, fontFamily: 'ZCOOL XiaoWei' }}>Great Knight, Sir Mon</div>
              <div id='playerHealthBar' style={{ width: 225, height: 10, marginTop: 9, borderRadius: 5, background: 'linear-gradient(to right, #e5194f, #8e18ee)' }} />
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ width: 580, height: 346, borderRadius: 5, objectFit: 'cover' }} />

        <img style={{ width: 576, height: 299, borderRadius: 10, border: '2px solid #492b71', marginTop: 17, objectFit: 'cover', filter: 'brightness(70%)' }}
          src='https://i.imgur.com/PGjI2Xx.png'
        />

        <img style={{ position: 'absolute', left: 340, bottom: 235, width: 122, borderRadius: 10, filter: 'brightness(80%) opacity(70%)', objectFit: 'cover' }}
          src='https://i.imgur.com/du95q6g.png'
        />

        <img style={{ position: 'absolute', right: 272, bottom: 235, width: 122, borderRadius: 10, filter: 'brightness(80%) opacity(70%)', objectFit: 'cover' }}
          src='https://i.imgur.com/tGlLLRT.png'
        />

        <div style={{
          position: 'absolute',
          bottom: 222, width: 550,
          paddingTop: 30, paddingBottom: 10,
          display: 'flex', justifyContent: 'space-evenly' }}
        >
          <div id='click' style={{ position: 'relative', width: 70, height: 70, display: 'flex', filter: isActive === 1 ? 'brightness(120%)' : null }}
            onMouseOver={() => setIsActive(1)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => slash()}
          >
            <img style={{ width: '100%', height: '100%', opacity: 0.8, filter: 'invert(40%)' }} src='https://i.imgur.com/OtDpLMn.png' />
            <div style={{
              position: 'absolute',
              top: 27, left: 10,
              width: 50, height: '100%',
              fontSize: 12, fontFamily: 'ZCOOL XiaoWei',
              color: 'lightgrey',
              letterSpacing: '1px',
              textAlign: 'center' }}
            >
              Slash
            </div>
          </div>
          <div id='click' style={{ position: 'relative', width: 70, height: 70, display: 'flex', filter: isActive === 2 ? 'brightness(120%)' : null }}
            onMouseOver={() => setIsActive(2)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => counter()}
          >
            <img style={{ width: '100%', height: '100%', borderRadius: 70, opacity: 0.8, filter: 'invert(40%)' }} src='https://i.imgur.com/OtDpLMn.png' />
            <div style={{
              position: 'absolute',
              top: 27, left: 10,
              width: 50, height: '100%',
              fontSize: 12, fontFamily: 'ZCOOL XiaoWei',
              color: 'lightgrey',
              letterSpacing: '1px',
              textAlign: 'center' }}
            >
              Counter
            </div>
          </div>
          <div id='click' style={{ position: 'relative', width: 70, height: 70, display: 'flex', filter: isActive === 3 ? 'brightness(120%)' : null }}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => heal()}
          >
            <img style={{ width: '100%', height: '100%', borderRadius: 70, opacity: 0.8, filter: 'invert(40%)' }} src='https://i.imgur.com/OtDpLMn.png' />
            <div style={{
              position: 'absolute',
              top: 27, left: 10,
              width: 50, height: '100%',
              fontSize: 12, fontFamily: 'ZCOOL XiaoWei',
              color: 'lightgrey',
              letterSpacing: '1px',
              textAlign: 'center' }}
            >
              Heal
            </div>
          </div>
          <div id='click' style={{ position: 'relative', width: 70, height: 70, display: 'flex', filter: isActive === 4 ? 'brightness(120%)' : null }}
            onMouseOver={() => setIsActive(4)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => stun()}
          >
            <img style={{ width: '100%', height: '100%', borderRadius: 70, opacity: 0.8, filter: 'invert(40%)' }} src='https://i.imgur.com/OtDpLMn.png' />
            <div style={{
              position: 'absolute',
              top: 27, left: 10,
              width: 50, height: '100%',
              fontSize: 12, fontFamily: 'ZCOOL XiaoWei',
              color: 'lightgrey',
              letterSpacing: '1px',
              textAlign: 'center' }}
            >
              Stun
            </div>
          </div>
        </div>
        <div id='non-select' style={{ position: 'absolute', bottom: 315, color: 'lightgrey', fontFamily: 'ZCOOL XiaoWei', letterSpacing: '2px' }}>Combat</div>

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ width: 320, display: 'flex', justifyContent: 'center', marginLeft: 30 }}>
            <div id='non-select' style={{ position: 'absolute', bottom: 195, color: 'lightgrey', fontFamily: 'ZCOOL XiaoWei', letterSpacing: '2px' }}>Mission Objective</div>
            <div id='non-select' style={{ position: 'absolute', bottom: 65, width: 310, fontSize: 15, color: '#999bac', textAlign: 'center' }}>
              The great Knight, Sir Mon, has been tasked by the King to liberate the mystical Ruins of Eden from the approaching Demon Army.
              Defeat all Demons in combat in order to reclaim the Ruins of Eden and complete the mission objective.
            </div>
          </div>
          <div style={{ width: 250, display: 'flex', justifyContent: 'center', color: 'silver' }}>
            <div id='non-select' style={{ position: 'absolute', bottom: 195, color: 'lightgrey', fontFamily: 'ZCOOL XiaoWei', letterSpacing: '2px' }}>Movement Controls</div>
            <div id='non-select' style={{ position: 'absolute', bottom: 165, fontSize: 18 }}>W</div>
            <div id='non-select' style={{ position: 'absolute', bottom: 107, marginRight: 110, fontSize: 18 }}>A</div>
            <div id='non-select' style={{ position: 'absolute', bottom: 107, marginLeft: 110, fontSize: 18 }}>D</div>
            <div id='non-select' style={{ position: 'absolute', bottom: 55, fontSize: 18 }}>S</div>
            <img style={{ position: 'absolute', bottom: 85, width: 70, filter: 'invert(70%)' }} src='/images/Assets/game/joystick.png' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
