import { useEffect, useState } from "react"
import "./styles/index.scss"

interface TradeResults {
  lotSize: number
  totalPrice: number
  shares: number
  target: number
  stopLoss: number
  profit: number
  loss: number
  netProfit: number
  netLoss: number
}

const App = () => {
  const [lotSize, setLotSize] = useState(0)
  const [price, setPrice] = useState(0)
  const [shares, setShares] = useState(0)
  const [target, setTarget] = useState(0)
  const [stoploss, setStopLoss] = useState(0)
  const [result, setResult] = useState<TradeResults>()

  useEffect(() => {
    // Let's calculate the no of shares user has to buy
    const _shares = lotSize * shares
    const _price = price * shares

    // Find profit and loss
    const _profit = (target / 100) * price
    const _loss = (stoploss / 100) * price

    // Target means user want to target x% more of the current price
    const _target = price + _profit
    const _stoploss = price - _loss

    // Now we find net profit in case user trade hits the target
    const _netProfit = _profit * shares
    const _netLoss = _loss * shares

    setResult({
      lotSize,
      totalPrice: _price,
      shares: _shares,
      target: _target,
      stopLoss: _stoploss,
      profit: _profit,
      loss: _loss,
      netProfit: _netProfit,
      netLoss: _netLoss,
    })
  }, [shares, lotSize, price, target, stoploss])

  return (
    <>
      <div className="container">
        <div className="input-group">
          <label>Lot Size</label>
          <input
            type="number"
            name="lot-size"
            placeholder="Enter Lot Size"
            min="0"
            onChange={e => setLotSize(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="input-group">
          <label>Current price of the stock</label>
          <input
            type="number"
            name="traded-price"
            placeholder="Enter current price"
            min="0"
            onChange={e => setPrice(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="input-group">
          <label>Enter no of shares to buy</label>
          <input
            type="number"
            name="qty"
            placeholder="Enter qty of shares"
            min="0"
            onChange={e => setShares(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="input-group" style={{ gridColumn: "1/2" }}>
          <label>Your target %</label>
          <input
            type="number"
            name="target"
            placeholder="Enter target (in %)"
            min="0"
            onChange={e => setTarget(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-group" style={{ gridColumn: "3/4" }}>
          <label>Your stoploss %</label>
          <input
            type="number"
            name="stoploss"
            placeholder="Enter stoploss (in %)"
            min="0"
            onChange={e => setStopLoss(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="info">
          <h3 className="underline">Processed Data</h3>
          <div className="msg-container">
            <p>Lot size is: {lotSize}</p>
            <p>Current price of the stock is: {price} rs.</p>
            <p>
              You are buying {result?.shares} shares worth {result?.totalPrice}{" "}
              rs.
            </p>
            <br />
            <p className="green">
              Your target of {target}% will be hit when stock price reaches:{" "}
              {result?.target}
            </p>
            <p className="red">
              Your stop loss of {stoploss}% will be hit when stock price
              reaches: {result?.stopLoss}
            </p>

            <br />
            <p>
              You will get profit of Rs. {result?.profit} per share if your
              target is hit.
            </p>
            <p>
              You will get loss of Rs. {result?.loss} per share if your stop
              loss is hit.
            </p>

            <br />
            <p>
              You will get{" "}
              <span className="green bold">
                net profit of Rs. {result?.netProfit}
              </span>{" "}
              if your target is hit.
            </p>
            <p>
              You will get{" "}
              <span className="bold red">
                net loss of Rs. {result?.netLoss}{" "}
              </span>{" "}
              if your stop loss is hit.
            </p>

            <br />
            <p className="bold">
              Amount after profit & loss will be Rs.{" "}
              <span className="green">
                {(result?.totalPrice || 0) + (result?.netProfit || 0)}
              </span>{" "}
              &{" "}
              <span className="red">
                {(result?.totalPrice || 0) - (result?.netLoss || 0)}
              </span>{" "}
              respectively.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
