const loadHorse = function() {

  var gltf = null;
  var mixer = null;
  var mixer_1 = null;
  var mixer_2 = null;
  var clock = new THREE.Clock();
  var clock_1 = new THREE.Clock();
  var clock_2 = new THREE.Clock();
  var controls;
  var camera;
  var object;
  var object_1;
  var controlsArray = [];
  var rendererArray = [];
  let scene_1;
  let scene_2;
  let scene_3;

  function changeScene(obj) {
     let  scene = new THREE.Scene();

     let ambient = new THREE.AmbientLight( obj.color_0 );
     scene.add( ambient );

     let directionalLight = new THREE.DirectionalLight( obj.color_1 );
     directionalLight.position.set( 0, 0, 1 );
     scene.add( directionalLight );

     let directionalLight2 = new THREE.DirectionalLight( obj.color_2 );
     directionalLight2.position.set( 0, 5, -5 );
     scene.add( directionalLight2 );

     return scene;

  }

  function init() {
     var container = $('#container_0');

      width = container.width();
      height = container.height();

      scene_1 = changeScene({color_0:0x101030, color_1:0xffeedd , color_2:0xffeedd });

      scene_2 = changeScene({color_0:0x101030, color_1:0x262626 , color_2:0x000000 });

      scene_3 =  changeScene({color_0:0xcccccc, color_1:0xffeedd  , color_2:0xffeedd  });

      camera = new THREE.PerspectiveCamera( 30, width / height, 0.01, 10000 );
      //camera.position.set(2, 2, 3);
      camera.position.x = -10;

      var target = new THREE.Vector3(0,0,0);

      camera.lookAt(target);

      var loader = new THREE.GLTFLoader();
      loader.setCrossOrigin( 'anonymous' );

      var scale = 0.02;
      var url = "https://rawcdn.githack.com/mrdoob/three.js/bc0c2c59398f8d0f2442ced77432bee83f870966/examples/models/gltf/Horse.glb";

      loader.load(url, function (data) {
        gltf = data;

        object = gltf.scene;
        object.scale.set(scale, scale, scale);
        object.translateZ(-9);
        object.translateY(-2.5);
        var animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer = new THREE.AnimationMixer( object );
            for ( var i = 0; i < animations.length; i ++ ) {
              animations[i].duration = 0.225;
              animations[i].tracks[0].times = [0, 0.015, 0.03, 0.045, 0.06, 0.075, 0.09, 0.105, 0.12, 0.135, 0.15, 0.165, 0.18, 0.195, 0.21, 0.225];
              var animation = animations[i];
              mixer.clipAction( animation ).play();
            }
        }
        scene_1.add(object);
      });

      loader.load(url, function (data) {
        gltf = data;

        object_1 = gltf.scene;
        object_1.scale.set(scale, scale, scale);
        object_1.translateZ(-9);
        object_1.translateY(-2.5);
        var animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer_1 = new THREE.AnimationMixer( object_1 );
            for ( var i = 0; i < animations.length; i ++ ) {
              animations[i].duration = 0.225;
              animations[i].tracks[0].times = [0, 0.015, 0.03, 0.045, 0.06, 0.075, 0.09, 0.105, 0.12, 0.135, 0.15, 0.165, 0.18, 0.195, 0.21, 0.225];
              var animation = animations[i];
              mixer_1.clipAction( animation ).play();
            }
        }
        scene_2.add(object_1);
      });

      loader.load(url, function (data) {
        gltf = data;

        object_2 = gltf.scene;
        object_2.scale.set(scale, scale, scale);
        object_2.translateZ(-9);
        object_2.translateY(-2.5);
        var animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer_2 = new THREE.AnimationMixer( object_2 );
            for ( var i = 0; i < animations.length; i ++ ) {
              animations[i].duration = 0.225;
              animations[i].tracks[0].times = [0, 0.015, 0.03, 0.045, 0.06, 0.075, 0.09, 0.105, 0.12, 0.135, 0.15, 0.165, 0.18, 0.195, 0.21, 0.225];
              var animation = animations[i];
              mixer_2.clipAction( animation ).play();
            }
        }
        scene_3.add(object_2);
      });

      for(let i = 0; i< 8; i++) {
        rendererArray.push(new THREE.WebGLRenderer({alpha:true}));
        controlsArray.push(new THREE.OrbitControls( camera, rendererArray[i].domElement));
      }

      for(let i = 0; i< 8; i++) {
        let controls = controlsArray[i];
        controls.enabled = false;
        controls.userPan = false;
        controls.userPanSpeed = 0.0;
        controls.enableKeys = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.75;
      }


      for(let i = 0; i< 8; i++) {
        let renderer = rendererArray[i];
        renderer.gammaOutput = true;
        renderer.autoClear = false;
        renderer.setSize(width, height);
      }

      for(let i in rendererArray) {
        $('#container_' + i).append(rendererArray[i].domElement);
      }
  }

  function animate() {
      requestAnimationFrame( animate );
      if (mixer) mixer.update(clock.getDelta());
      if (mixer_1) mixer_1.update(clock_1.getDelta());
      if (mixer_2) mixer_2.update(clock_2.getDelta());
      for(let i in controlsArray) {
        controlsArray[i].update();
      }
      render();
  }

  function render() {
    rendererArray[0].render(scene_1, camera );
    rendererArray[1].render(scene_1, camera );
    rendererArray[2].render(scene_3, camera );
    rendererArray[3].render(scene_1, camera );
    rendererArray[4].render(scene_1, camera );
    rendererArray[5].render(scene_2, camera );
    rendererArray[6].render(scene_1, camera );
    rendererArray[7].render(scene_1, camera );

  }

 return { init, animate };

}

Number.prototype.toFixedNumber = function () {
    var data= String(this).split(/[eE]/);
    if(data.length== 1) return data[0];

    var  z= '', sign= this<0? '-':'',
    str= data[0].replace('.', ''),
    mag= Number(data[1])+ 1;

    if(mag<0){
        z= sign + '0.';
        while(mag++) z += '0';
        return z + str.replace(/^\-/,'');
    }
    mag -= str.length;
    while(mag--) z += '0';
    return str + z;
}

const contractFunctions = function() {

  const horseTronAddress = "TP3aPUJTdHo7uEm91r3abhuJCmFejpLTzP";

  let horseTronObj, horseTronInstance;

  async function init() {
    horseTronObj = await window.tronWeb.trx.getContract(horseTronAddress);
    horseTronInstance = await window.tronWeb.contract(horseTronObj.abi.entrys, horseTronObj.contract_address);
  }

  async function getNetTotalAmountBet(obj) {
    return await horseTronInstance.getNetTotalAmountBet(obj.roundNumber).call();
  }

  async function getPlayerAmountBetOnEachValue(obj) {
    return await horseTronInstance.getPlayerAmountBetOnEachValue(obj.roundNumber, obj.betValue).call();
  }

  async function getRoundAmountBetOnEachValue(obj) {
    return await horseTronInstance.getRoundAmountBetOnEachValue(obj.roundNumber, obj.betValue).call();
  }

  async function calculateDivs(obj) {
    return await horseTronInstance.calculateDivs(obj.roundNumber).call();
  }

  async function calculateAmountWon(obj) {
    return await horseTronInstance.calculateAmountWon(obj.roundNumber).call();
  }

  async function getLeftoverAmounts(obj) {
    return await horseTronInstance.getLeftoverAmounts(obj.roundNumber).call();
  }

  async function getRoundNumber(obj) {
        return await horseTronInstance.roundNumber().call();
  }

   async function getBetWindow(obj) {
        return await horseTronInstance.betWindow().call();
  }

   async function getRoundInfo(obj) {
        return await horseTronInstance.roundInformation(obj.roundNumber).call();
  }

  async function getTotalDivs(obj) {
        return await horseTronInstance.totalDivFees().call();
  }

  async function placeBet(obj) {
    return await horseTronInstance.placeBet(obj.betValue, obj.nonce)
                   .send({
                     shouldPollResponse: false,
                     feeLimit: 5000000,
                     callValue: obj.amount,
                     from: obj.userAddress
                   });
  }

  async function pressButton(obj) {
    return await horseTronInstance.addLeftoverFundsToCurrentRound(obj.roundNumber)
                   .send({
                     shouldPollResponse: false,
                     feeLimit: 5000000,
                     from: obj.userAddress
                   });
  }

  async function withdrawDividends(obj) {
    return await horseTronInstance.withdrawDividends(obj.roundNumber)
                   .send({
                     shouldPollResponse: false,
                     feeLimit: 5000000,
                     from: obj.userAddress
                   });
  }

  async function withdrawWinnings(obj) {
    return await horseTronInstance.withdrawWinnings(obj.roundNumber)
                   .send({
                     shouldPollResponse: false,
                     feeLimit: 5000000,
                     from: obj.userAddress
                   });
  }

    async function addLeftoverFundsToCurrentRound(obj) {
    return await horseTronInstance.addLeftoverFundsToCurrentRound(obj.roundNumber)
                   .send({
                     shouldPollResponse: false,
                     feeLimit: 5000000,
                     from: obj.userAddress
                   });
  }

  return {  init, getNetTotalAmountBet, getRoundNumber, getRoundInfo, getBetWindow, addLeftoverFundsToCurrentRound,
            getTotalDivs, placeBet, pressButton, withdrawWinnings, getPlayerAmountBetOnEachValue,
            getRoundAmountBetOnEachValue, withdrawDividends, calculateDivs, calculateAmountWon, getLeftoverAmounts };

}();

const interface = function() {

async function getNetTotalAmountBet(obj) {
  return await contractFunctions.getNetTotalAmountBet(obj);
}

async function getPlayerAmountBetOnEachValue(obj) {
  return await contractFunctions.getPlayerAmountBetOnEachValue(obj);
}

async function getRoundAmountBetOnEachValue(obj) {
  return await contractFunctions.getRoundAmountBetOnEachValue(obj);
}

async function getLeftoverAmounts(obj) {
  return await contractFunctions.getLeftoverAmounts(obj);
}

async function calculateDivs(obj) {
  return await contractFunctions.calculateDivs(obj);
}

async function calculateAmountWon(obj) {
  return await contractFunctions.calculateAmountWon(obj);
}

async function getRoundNumber() {
  return await contractFunctions.getRoundNumber();
}

 async function getRoundInfo(obj) {
   return await contractFunctions.getRoundInfo(obj);
 }

 async function withdrawLeftoverAmountsFunc(obj) {
   return await contractFunctions.addLeftoverFundsToCurrentRound(obj);
 }

async function withdrawLeftoverAmounts(obj) {
  let leftoverAmountsArr = localStorage.getItem("leftoverRounds");
  leftoverAmountsArr = JSON.parse(leftoverAmountsArr)['arr'];
  console.log(leftoverAmountsArr);
  for(let i in leftoverAmountsArr) {
    let roundNumber = leftoverAmountsArr[i];
    await withdrawLeftoverAmountsFunc({roundNumber:roundNumber});
  }
   localStorage.removeItem("leftoverRounds");
}

async function checkLeftoverAmounts() {
  let maxRoundNumber = localStorage.getItem("roundNumber");
  let leftoverAmounts = 0;
  let roundNumberArr = { arr: []};
  for(let i = 1; i <= maxRoundNumber; i++) {
    let roundNumber = i;
    try {
      let amounts = parseFloat(await getLeftoverAmounts({roundNumber:roundNumber}));
      if(amounts >  0) {
        roundNumberArr['arr'].push(roundNumber);
        leftoverAmounts += amounts;
      }
    } catch(err) {}
  }
  roundNumberArr = JSON.stringify(roundNumberArr);
  localStorage.setItem("leftoverRounds",roundNumberArr);
  return leftoverAmounts;
}

async function getWinner() {
  let maxRoundNumber = localStorage.getItem("roundNumber");
  let roundInfo = await getRoundInfo({roundNumber:maxRoundNumber});
  return roundInfo.currentWinningValue;
}

async function getLastTenWinners() {
  let maxRoundNumber = localStorage.getItem("roundNumber");
  if(maxRoundNumber === 0) return;
  maxRoundNumber--
  let roundInfoArr = [];
  for(let i = maxRoundNumber; i > maxRoundNumber - 10; i--) {
    try {
      let roundNumber = i;
      let roundInfo = parseInt((await getRoundInfo({roundNumber:roundNumber})).currentWinningValue);
      roundInfoArr.push(roundInfo);
   } catch(err) {}
  }
  return roundInfoArr;
}

 async function getAmountDivs() {
   let maxRoundNumber = localStorage.getItem("roundNumber");
   let amountDivs = 0;
   for(let i = 1; i <= maxRoundNumber; i++) {
     let roundNumber = i;
     try {
       amountDivs += parseFloat(await calculateDivs({roundNumber:roundNumber}));
     } catch(err) {}
   }
   return amountDivs;
 }

 async function getAmountWon() {
   let maxRoundNumber = localStorage.getItem("roundNumber");
   let amountWon = 0;
   for(let i = 1; i <= maxRoundNumber; i++) {
     let roundNumber = i;
     try {
       amountWon += parseFloat(await calculateAmountWon({roundNumber:roundNumber}));
     } catch(err) {}
   }
   return amountWon;
 }

 async function getAmountWageredOnEachHorse() {
   let roundNumber = localStorage.getItem("roundNumber");
    let netAmountWon = await getNetTotalAmountBet({roundNumber:roundNumber});
    for(let i = 0; i < 8; i++) {
      let betValueAmountWagered = await getRoundAmountBetOnEachValue({roundNumber:roundNumber, betValue:i});
      betValueAmountWagered = parseFloat(betValueAmountWagered);
      betValueAmountWagered =  betValueAmountWagered === 0 ? 1e6 : betValueAmountWagered;
      let odds = parseInt(netAmountWon) / parseInt(betValueAmountWagered);
      odds = typeof odds ===  "number" ? odds : 0;
      $('#betValueWager_' + i).text(betValueAmountWagered/1e6);
      $('#odds_' + i).text(odds.toFixed(3) + "X");
    }
  }

  async function getRoundTime(_roundNumber) {
    let roundInfo = await getRoundInfo({roundNumber:_roundNumber});
    let roundTime = roundInfo.startTime;
    roundTime = (parseInt(roundTime) + 360) * 1000;
    let timeDiff = (new Date(roundTime) - Date.now());
    timeDiff = timeDiff <= 0 ? 0 : timeDiff;
    return timeDiff;
  }

  async function getTime() {
   let roundNumber = localStorage.getItem("roundNumber");
    let roundInfo = await getRoundInfo({roundNumber:roundNumber});
    let roundTime = roundInfo.startTime;
    roundTime = (parseInt(roundTime) + 360) * 1000;
    let timeDiff = (new Date(roundTime) - Date.now());
    timeDiff = timeDiff <= 0 ? 0 : timeDiff;
    return timeDiff;
  }

  async function getPot(rndNum) {
    let roundNumber = rndNum ? rndNum : localStorage.getItem("roundNumber");
    let roundInfo = await getRoundInfo({roundNumber:roundNumber});
    let netAmountBet = await getNetTotalAmountBet({roundNumber:roundNumber});
    let totalPot = parseInt(roundInfo.nextRoundBonus) + parseInt(netAmountBet);
    totalPot /= 1e6;
    return totalPot;
  }
  async function placeBet(obj) {
    let userAddress = localStorage.getItem("userAddress");
    return await contractFunctions.placeBet({betValue:obj.betValue, userAddress:userAddress, amount:obj.amount, nonce:obj.nonce});
  }

  async function pressButton() {
    let userAddress = localStorage.getItem("userAddress");
    let roundNumber = localStorage.getItem("roundNumber");
    return await contractFunctions.pressButton({roundNumber:roundNumber,userAddress:userAddress});
  }

  async function withdrawWinnings() {
    let userAddress = localStorage.getItem("userAddress");
    let maxRoundNumber = localStorage.getItem("roundNumber");
    for(let i = 1; i <= maxRoundNumber; i++) {
      try {
        let roundNumber = i;
        let timeDiff = await getRoundTime(roundNumber);
        if(timeDiff === 0) {
          let winnings = await calculateAmountWon({roundNumber:roundNumber});
          if(winnings > 0) {
            await contractFunctions.withdrawWinnings({roundNumber:roundNumber, userAddress:userAddress});
          }
        }
      } catch(err) {}
    }
  }

  async function withdrawDividends() {
    let userAddress = localStorage.getItem("userAddress");
    let maxRoundNumber = localStorage.getItem("roundNumber");
    for(let i = 1; i <= maxRoundNumber; i++) {
      try {
        let roundNumber = i;
        let timeDiff = await getRoundTime(roundNumber);
        if(timeDiff === 0) {
          let divs = await calculateDivs({roundNumber:roundNumber});
          if(divs > 0) {
            await contractFunctions.withdrawDividends({roundNumber:roundNumber, userAddress:userAddress});
          }
        }
      } catch(err) {}
    }
  }

  return { withdrawLeftoverAmounts, checkLeftoverAmounts, getAmountWageredOnEachHorse, placeBet, pressButton, getLastTenWinners, getWinner, getTime, getPot, getRoundNumber, getAmountDivs, getAmountWon, withdrawWinnings, withdrawDividends };

}();

const main = function() {

  function distanceBetweenElems(elem1, elem2) {
    var e1Rect = elem1.getBoundingClientRect();
    var e2Rect = elem2.getBoundingClientRect();
    var dx = (e1Rect.left+(e1Rect.right-e1Rect.left)/2) - (e2Rect.left+(e2Rect.right-e2Rect.left)/2);
    var dy = (e1Rect.top+(e1Rect.bottom-e1Rect.top)/2) - (e2Rect.top+(e2Rect.bottom-e2Rect.top)/2);
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  }

 async function runHorseAnimation(_winningNumber) {
   return new Promise((resolve) => {
     let fanfareSound = $("#fanfare");
     fanfareSound.get(0).play();
     console.log(fanfareSound);
     console.log(fanfareSound.get(0));
     setTimeout(function() {
       fanfareSound.get(0).pause();
       fanfareSound.get(0).currentTime = 0;
       let horsesRunning = $("#horsesRunning");
        horsesRunning.get(0).play();
        console.log("starting animation");
        let distance = distanceBetweenElems(document.querySelector('#container_0 canvas'),document.getElementById('main'));
        for(let i = 0; i < 8; i++) {
          let time = Math.random() * (10 - 8) + 8;
          if(i === _winningNumber) {
            time = 7.8;
          }
          time = time.toString() + "s";
          let obj = { 'transform': 'translateX(' + ((2*distance) + 200).toString() + 'px)', 'transition-duration': time, 'animation-timing-function':'cubic-bezier(1,4,1,1)' };
          console.log(obj);
          $('#container_' + i).css(obj);
        }
        let crowdCheers = $("#crowdCheers");
        setTimeout(function() {
          horsesRunning.get(0).pause();
          horsesRunning.get(0).currentTime = 0;
          crowdCheers.get(0).play();
          $('#racecourse')
            .transition('flash');
        }, 9000);
        setTimeout(function() {
          crowdCheers.get(0).pause();
          crowdCheers.get(0).currentTime = 0;
          $('.item.numberCard.container').removeAttr('style');
          resolve();
        }, 14000);
     }, 8500);
   });
 }

 function clearUI() {
   for(let i = 0; i < 8; i++) {
     $('#betValueWager_' + i).text('0');
     $('#odds_' + i).text('0X');
     $('#roundPot').text('0');
   }
 }

  async function checkTronLink() {
    let userAddress = await window.tronWeb.defaultAddress.hex;
    if(userAddress) {
      localStorage.setItem("userAddress", userAddress);
    }
  };

  function enableInputAndButtons() {
    let elements  = $('#menu > div > div.item.playerCard').find('button');
    for(let i = 0; i < 8; i++) {
      $(elements[i]).prop('enabled', true);
      $(elements[i]).parent().find('input').prop('enabled', true);
      $(elements[i]).removeAttr('disabled');
      $(elements[i]).parent().find('input').removeAttr('disabled');
    }
  }

  function disableInputAndButtons() {
    let elements  = $('#menu > div > div.item.playerCard').find('button');
    for(let i = 0; i < 8; i++) {
      $(elements[i]).prop('disabled', true);
      $(elements[i]).parent().find('input').prop('disabled', true);
    }
  }

  async function updateRoundInterface() {
    let roundNumber = localStorage.getItem("roundNumber");
    roundNumber = parseInt(roundNumber);
    let time = await interface.getTime();
    time = new Date(time);
    let timeHours = time.getUTCHours();
    timeHours = "0" + timeHours;
    let timeMinutes = time.getUTCMinutes();
    timeMinutes = "0" + timeMinutes;
    let timeSeconds = time.getUTCSeconds();
    timeSeconds = timeSeconds >= 10 ? timeSeconds : "0" + timeSeconds;
    let timeString = timeHours + ":" + timeMinutes + ":" + timeSeconds;
    $('#roundTime').text(timeString);
    if(parseInt(timeSeconds) === 0 && parseInt(timeMinutes) === 0) {
       clearUI();
       enableInputAndButtons();
      $('#roundNumber').text(roundNumber + 1);
      $('#roundState').text('NEW_ROUND');
      let potAmt = await interface.getPot(roundNumber + 1);
      $('#roundPot').text(potAmt);
    } else if(parseInt(timeMinutes) >= 1 && parseInt(timeMinutes) < 6) {
        enableInputAndButtons();
        $('#roundState').text('MARKET_OPEN');
        $('#roundNumber').text(roundNumber);
        let potAmt = await interface.getPot();
        $('#roundPot').text(potAmt);
        await interface.getAmountWageredOnEachHorse();
    }  else if(parseInt(timeSeconds) > 0 && parseInt(timeMinutes) < 1) {
        let potAmt = await interface.getPot();
        $('#roundPot').text(potAmt);
        await interface.getAmountWageredOnEachHorse();
        disableInputAndButtons();
        $('#roundNumber').text(roundNumber);
        $('#roundState').text('MARKET_CLOSED');
    }
  }

 function getWinnerName(_numberWinner) {
   if(_numberWinner === 0) {
     return "Hodl Me";
   }
   else if(_numberWinner === 1) {
     return "Too Trong";
   }
   else if(_numberWinner === 2) {
     return "Moontrot";
   }
   else if(_numberWinner === 3) {
     return "Sonofoagun";
   }
   else if(_numberWinner === 4) {
     return "Justin Time";
   }
   else if(_numberWinner === 5) {
     return "Trxmaster";
   }
   else if(_numberWinner === 6) {
     return "Tronx";
   }
   else if(_numberWinner === 7) {
     return "Lucky Lady";
   }
 }

  async function loadWinnerTable() {
    $('#historyTable > tbody').empty();
    let winnerHistoryArr = await interface.getLastTenWinners();
    console.log(winnerHistoryArr);
    for(let i in winnerHistoryArr) {
      let name = getWinnerName(winnerHistoryArr[i]);
      $('#historyTable > tbody').append('<tr><td class="center aligned">' + name + '</td></tr>');
    }
  }

  async function controlHorseAnimation() {
    let marketClosed = false;
    let roundStateText = $('#roundState').text();
    console.log(localStorage.getItem("restartAnimation"), roundStateText);
    if(roundStateText === 'MARKET_CLOSED') {
      marketClosed = true;
    } else if(roundStateText === 'MARKET_OPEN') {
        localStorage.setItem("restartAnimation","true");
    }
    if(marketClosed && localStorage.getItem("restartAnimation") === "true" && !document.hidden) {
      console.log("should start");
      let winnerNumber = parseInt(await interface.getWinner());
      await runHorseAnimation(winnerNumber);
      console.log(winnerNumber);
      let color = $('#racecourse > div.stable > div:nth-child(' + (winnerNumber + 1).toString() + ')').css('background-color');
      let name = getWinnerName(winnerNumber);
      console.log(name);
      $('#roundWinner').css('color', color);
      $('#roundWinner').text(name);
      $('#leaderBoards').modal('show');
      setTimeout(function() {
        $('#leaderBoards').modal('hide');
      }, 5000);
      localStorage.setItem("restartAnimation","false");
    }
    setTimeout(async function() {
      console.log("restarting");
      await controlHorseAnimation();
    }, 10000);
  }

  async function updateWinnings() {
    setInterval(async function() {
      let amountDiv = await interface.getAmountDivs();
      let amountWon = await interface.getAmountWon();
      $('.amountDiv').text(amountDiv/1e6 + " TRX");
      $('.amountWon').text(amountWon/1e6 + " TRX");
    }, 2000);
  }

  async function checkLeftoverAmounts() {
    setInterval(async function() {
      if($('#roundState').text() === "MARKET_OPEN") {
        let leftoverAmounts = await interface.checkLeftoverAmounts();
        console.log(leftoverAmounts);
        if(leftoverAmounts > 0) {
          $('#pressMagicButton').show();
          $('#pressMagicButton').text('CLAIM FREE TRON');
        }  else {
          $('#pressMagicButton').hide();
        }
      } else {
          $('#pressMagicButton').hide();
        }
    }, 10000);
  }

  async function updateValues() {
    setInterval(async function() {
      let roundNumber = await interface.getRoundNumber();
      roundNumber = parseInt(roundNumber);
      localStorage.setItem("roundNumber", roundNumber);
      await updateRoundInterface();
    }, 900);
  }

  $('#pressMagicButton').on('click', async function() {
    await interface.withdrawLeftoverAmounts();
  });

  $('#withdrawWinnings').on('click', async function() {
     await interface.withdrawWinnings();
  });

  $('#withdrawDivs').on('click', async function() {
     await interface.withdrawDividends();
  });

  $('#menu > div > div.item.playerCard').find('button').on('click', async function() {
    let betAmount = $(this).parent().find('input').val();
    $(this).parent().find('input').val('');
    betAmount = parseInt(betAmount) * 1e6;
    let betValue = $(this).parent().parent().attr('id');
    betValue = parseInt(betValue);
    let nonce = Math.random().toString().slice(2);
    let txHash = await interface.placeBet({betValue:betValue, amount:betAmount, nonce:nonce});
    $('.txHash').html('<a href="https://shasta.tronscan.org/#/transaction/' + txHash + '" target="_blank"' + '>Tx Hash</a>');
    setTimeout(function() {
      $('.txHash').html('');
    }, 15000);
  });

  async function updateWinnerTable() {
    setInterval(async function() {
      await loadWinnerTable();
    }, 20000);
  }

  return { checkTronLink, checkLeftoverAmounts, updateValues, updateWinnings, controlHorseAnimation, updateWinnerTable };
};

function tronWebReady() {
  console.log("starting");
  return new Promise((resolve) => {
    setTimeout(function() {
      if(window.tronWeb) {
        resolve();
      } else {
          console.log("restarting");
          tronWebReady();
        }
    }, 1000);
  });
}

var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

async function initDapp() {
  await tronWebReady();
  let mainObj = await main();
  await mainObj.checkTronLink();
  await mainObj.updateValues();
  await mainObj.updateWinnings();
  await mainObj.controlHorseAnimation();
  await mainObj.checkLeftoverAmounts();
  await mainObj.updateWinnerTable();
}

$(document).ready(function() {
   let horseObj = loadHorse();
   horseObj.init();
   horseObj.animate();
});

setTimeout(async function() {
  await contractFunctions.init();
  await initDapp();
}, 2000);
