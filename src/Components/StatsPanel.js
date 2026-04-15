import { Card, Button } from 'react-bootstrap';

const StatsPanel = ({ gold, clickPower, clickUpgradeCost, onMine, onUpgradeClick }) => (
  <Card className="bg-dark text-white border-warning p-4 text-center shadow">
    <h2 className="display-4 mb-2">{Math.floor(gold)} 🪙</h2>
    <p className="text-info">Tıklama Gücü: {clickPower}</p>
    <Button 
      variant="warning" className="rounded-circle my-4 p-5 shadow-lg" 
      onClick={onMine} style={{ fontSize: '3rem', border: '5px solid #856404' }}
    >
      ⛏️
    </Button>
    <Button variant="info" size="sm" onClick={onUpgradeClick} disabled={gold < clickUpgradeCost}>
      Kazma Gücünü Artır ({clickUpgradeCost} 🪙)
    </Button>
  </Card>
);

export default StatsPanel;