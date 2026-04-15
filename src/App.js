import React, { useState, useEffect, use } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MINER_TEMPLATES } from './Interfaces/MinerTypes';
import StatsPanel from './Components/StatsPanel';
import MinerCard from './Components/MinerCard';
import { useGameLogic } from './Components/useGameLogic';

function App() {

  const {
    gold, setGold, miners, clickPower, clickUpgradeCost, notification,
    hireMiner, upgradeMiner, upgradeClickPower, repairMiner, fireMiner
  } = useGameLogic();

  return (
    <Container className="py-5 text-white" style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      {notification && <div className="alert alert-danger fixed-top">{notification}</div>}
      <h1 className="text-center mb-5 text-warning fw-bold">MINER TYCOON</h1>

      <Row>
        <Col lg={4}>
          <StatsPanel
            gold={gold} clickPower={clickPower}
            clickUpgradeCost={clickUpgradeCost}
            onMine={() => setGold(g => g + clickPower)}
            onUpgradeClick={upgradeClickPower}
          />
          <div className="mt-4 d-grid gap-2">
            <h5 className="text-secondary small text-center mb-3">Madenci Mağazası</h5>
            <Button
              variant="outline-primary"
              onClick={() => hireMiner('INTERN')}
              disabled={gold < MINER_TEMPLATES.INTERN.hireCost}
            >
              STAJYER ({MINER_TEMPLATES.INTERN.hireCost} 🪙)
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => hireMiner('JUNIOR')}
              disabled={gold < MINER_TEMPLATES.JUNIOR.hireCost}
            >
              JUNIOR ({MINER_TEMPLATES.JUNIOR.hireCost} 🪙)
            </Button>            <Button
              variant="outline-success"
              onClick={() => hireMiner('SENIOR')}
              disabled={gold < MINER_TEMPLATES.SENIOR.hireCost}
            >
              SENIOR ({MINER_TEMPLATES.SENIOR.hireCost} 🪙)
            </Button>

          </div>
        </Col>



        <Col lg={8}>
          <h3 className="mb-4 text-info">Aktif Çalışanlar ({miners.length})</h3>
          <Row>
            {miners.map(miner => (
              <MinerCard
                key={miner.id} miner={miner} gold={gold}
                onUpgrade={upgradeMiner} onRepair={repairMiner} onFire={fireMiner}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );

}


export default App;