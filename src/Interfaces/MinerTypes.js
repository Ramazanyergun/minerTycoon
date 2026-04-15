export const MINER_TEMPLATES = {
    INTERN: {
        type: "intern",
        namne: "Stajyer",
        baseProduction: 2, //basic production per second
        baseMaxDurability: 50, // maximum durability before breaking, can be increased with upgrades
        hireCost: 50, // cost to hire this miner
        repairCost: 30, // cost to repair this miner
        baseUpgradeCost: 100, // initial amount to upgrade
        riskFactor: 3 // chance of the make a mistake and break, can be reduced with upgrades
    },
    JUNIOR: {
        type: "junior",
        namne: "Junior",
        baseProduction: 5, //basic production per second
        baseMaxDurability: 100, // maximum durability before breaking, can be increased with upgrades
        hireCost: 300, // cost to hire this miner
        repairCost: 60, // cost to repair this miner
        baseUpgradeCost: 200, // initial amount to upgrade
        riskFactor: 0.5 // chance of the make a mistake and break, can be reduced with upgrades
    },
    SENIOR: {
        type: "senior",
        namne: "Senior",
        baseProduction: 10, //basic production per second
        baseMaxDurability: 200, // maximum durability before breaking, can be increased with upgrades
        hireCost: 800, // cost to hire this miner
        repairCost: 150, // cost to repair this miner
        baseUpgradeCost: 500, // initial amount to upgrade
        riskFactor: 0.1 // chance of the make a mistake and break, can be reduced with upgrades
    }

}