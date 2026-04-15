// useGameLogic.js
import { useState, useEffect } from 'react';
import { MINER_TEMPLATES } from '../Interfaces/MinerTypes';


export const useGameLogic = () => {


    const [gold, setGold] = useState(() => {
        const savedGold = localStorage.getItem('miner_gold');
        return savedGold ? parseFloat(savedGold) : 0;
    });

    const [miners, setMiners] = useState(() => {
        const savedMiners = localStorage.getItem('miner_list');
        return savedMiners ? JSON.parse(savedMiners) : [];
    });

    const [clickPower, setClickPower] = useState(() => {
        const savedPower = localStorage.getItem('miner_clickPower');
        return savedPower ? parseInt(savedPower) : 1;
    });

    const [clickUpgradeCost, setClickUpgradeCost] = useState(() => {
        const savedCost = localStorage.getItem('miner_clickCost');
        return savedCost ? parseInt(savedCost) : 25;
    });

    const [notification, setNotification] = useState(null);

    const hireMiner = (type) => {
        const template = MINER_TEMPLATES[type.toUpperCase()];

        if (gold >= template.hireCost) {
            const newMinerObject = {
                id: Date.now(),
                name: `${template.type} #${miners.length + 1}`,
                type: template.type,
                level: 1,
                currentDurability: template.baseMaxDurability,
                maxDurability: template.baseMaxDurability,
                production: template.baseProduction,
                upgradeCost: template.baseUpgradeCost,
                repairCost: template.repairCost,
                riskFactor: template.riskFactor,
                isBroken: false,
            };

            setGold(prevGold => prevGold - template.hireCost);
            setMiners(prevMiners => [...prevMiners, newMinerObject]);
        } else {
            alert("Yeterli altının yok!");
        }
    };

    const upgradeMiner = (minerId) => {
        const minerToUpgrade = miners.find(m => m.id === minerId);

        if (minerToUpgrade && gold >= minerToUpgrade.upgradeCost) {
            setGold(prev => prev - minerToUpgrade.upgradeCost);

            setMiners(prevMiners => {
                return prevMiners.map(miner => {
                    if (miner.id === minerId) {
                        const newProduction = Math.ceil(miner.production * 1.3);
                        const newUpgradeCost = Math.floor(miner.upgradeCost * 1.6);
                        const newmaxDurability = Math.ceil(miner.maxDurability * 1.2);
                        const newRiskFactor = Math.max(0.01, miner.riskFactor - miner.riskFactor * 0.1);


                        return {
                            ...miner,
                            level: miner.level + 1,
                            production: newProduction,
                            upgradeCost: newUpgradeCost,
                            maxDurability: newmaxDurability,
                            riskFactor: newRiskFactor,
                            currentDurability: newmaxDurability
                        };
                    }
                    return miner;
                });
            });
        } else {
            console.log("Geliştirme başarısız: Altın yetersiz veya madenci bulunamadı.");
        }
    };

    const repairMiner = (minerId) => {
        const minerToRepair = miners.find(m => m.id === minerId);
        if (minerToRepair && minerToRepair.isBroken && gold >= minerToRepair.repairCost) {
            setGold(prev => prev - minerToRepair.repairCost);
            setMiners(prevMiners =>
                prevMiners.map(miner => {
                    if (miner.id === minerId) {
                        return {
                            ...miner,
                            isBroken: false,
                            currentDurability: miner.maxDurability
                        };
                    }
                    return miner;
                })
            );
        }
    };
    const fireMiner = (minerId) => {
        const minerToFire = miners.find(m => m.id === minerId);

        if (minerToFire) {
            const confirmFire = window.confirm(`${minerToFire.name} işten çıkarılsın mı?`);

            if (confirmFire) {
                setMiners(prevMiners => prevMiners.filter(miner => miner.id !== minerId));

                const template = MINER_TEMPLATES[minerToFire.type.toUpperCase()];
                const refund = template.hireCost * 0.7;

                setGold(prev => prev + refund);

                console.log(`${minerToFire.name} kovuldu, ${refund} altın iade edildi.`);
            }
        }
    };

    const upgradeClickPower = () => {
        if (gold >= clickUpgradeCost) {
            setGold(prev => prev - clickUpgradeCost);
            setClickPower(prev => prev * 2);
            setClickUpgradeCost(prev => Math.floor(prev * 2.5));

            console.log("Tıklama gücü arttı! Yeni güç: " + (clickPower * 2));
        } else {
            alert("Tıklama gücünü geliştirmek için yeterli altının yok!");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {

            setMiners(prevMiners => {
                let totalTickIncome = 0;
                let firedMiners = [];

                const updated = prevMiners.filter(miner => {

                    const chance = Math.random() * 100;
                    if (!miner.isBroken && chance < (miner.riskFactor || 0)) {
                        firedMiners.push(miner.name);
                        return false;
                    }
                    return true;
                }).map(miner => {
                    if (!miner.isBroken) {
                        totalTickIncome += miner.production;

                        const nextDur = miner.currentDurability - 1;
                        return {
                            ...miner,
                            currentDurability: Math.max(0, nextDur),
                            isBroken: nextDur <= 0
                        };
                    }
                    return miner;
                });

                if (firedMiners.length > 0) {
                    console.log("Kötü Haber: ", firedMiners.join(", ") + " iş kazası/hata nedeniyle işten ayrıldı!");
                    showNotification(`${firedMiners} disiplinsiz davranışları nedeniyle kovuldu!`);

                }


                setGold(prevGold => prevGold + totalTickIncome);
                localStorage.setItem('miner_gold', gold);
                localStorage.setItem('miner_list', JSON.stringify(miners));
                localStorage.setItem('miner_clickPower', clickPower);
                localStorage.setItem('miner_clickCost', clickUpgradeCost);
                return updated;

            });

        }, 1000);

        return () => clearInterval(interval);
    }, [gold, miners, clickPower, clickUpgradeCost]);


    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };
    return {
        gold, setGold, miners, clickPower, clickUpgradeCost, notification,
        hireMiner, upgradeMiner, upgradeClickPower, repairMiner, fireMiner
    };
};