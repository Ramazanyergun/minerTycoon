import { Card, Button, ProgressBar, Col } from 'react-bootstrap';

const MinerCard = ({ miner, onUpgrade, onRepair, onFire, gold }) => (
    <Col md={6} className="mb-3">
        <Card className={`bg-dark border-${miner.isBroken ? 'danger' : 'secondary'} text-white`}>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title className={miner.isBroken ? 'text-danger' : 'text-success'}>
                        {miner.name} {miner.isBroken && "⚠️"}
                    </Card.Title>
                    <small className="text-muted">Lv. {miner.level}</small>
                </div>
                <ProgressBar
                    variant={miner.isBroken ? "danger" : "info"}
                    now={(miner.currentDurability / miner.maxDurability) * 100}
                    className="my-2" style={{ height: '8px' }}
                />
                <p className="small mb-1">Üretim: <span className="text-warning">{miner.production}/sn</span></p>
                <p className="small mb-3">Risk: <span className="text-danger">%{miner.riskFactor}</span></p>

                <div className="d-flex gap-2">
                    <Button size="sm" variant="primary" onClick={() => onUpgrade(miner.id)} disabled={gold < miner.upgradeCost}>
                        Eğit ({miner.upgradeCost})
                    </Button>
                    {miner.isBroken && (
                        <Button size="sm" variant="success" onClick={() => onRepair(miner.id)} disabled={gold < miner.repairCost}>
                            Tamir ({miner.repairCost})
                        </Button>
                    )}
                    <Button size="sm" variant="outline-danger" onClick={() => onFire(miner.id)}>Kov</Button>
                </div>
            </Card.Body>
        </Card>
    </Col>
);

export default MinerCard;