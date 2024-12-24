import { Router, Request, Response } from "express";
import { receieptsProcessed } from "../../data";
import { Receipt } from "../../types/Receipt";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/:id/points", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  // add validation

  //add error handling for if not found

  const receipt = receieptsProcessed.find((m) => m.id === id);

  if (!receipt) {
    res.status(201).send(`ID: ${id} not found or is invalid`);
  }

  res.status(200).send({ points: receipt?.points });
});

router.post("/process", (req, res: Response) => {
  const { retailer, purchaseDate, purchaseTime, items, total } = req.body;
  let points = 0;
  const totalNum = parseFloat(total);
  const itemPairs = Math.floor(items.length / 2);
  const purchaseDay = parseInt(purchaseDate.split("-")[2]);
  const purchaseHour = parseInt(purchaseTime.split(":")[0]);
  console.log(purchaseHour);

  //Rule 1
  const regex = /[a-zA-Z0-9]/g; // Regex to match alphanumeric characters
  const matches = retailer.match(regex);
  points += matches ? matches.length : 0;

  //Rule 2
  if (Number.isInteger(totalNum)) {
    points += 50;
    console.log("Rule2");
  }

  //Rule 3
  if (totalNum % 0.25 === 0) {
    points += 25;
    console.log("Rule3");
  }

  //Rule 4
  if (itemPairs > 0) {
    points += itemPairs * 5;
    console.log("Rule4");
  }

  //Rule 5
  items.forEach((item: any) => {
    if (item.shortDescription.trim().length % 3 === 0) {
      let pointsForItem = Math.ceil(parseFloat(item.price) * 0.2);
      points += pointsForItem;
      console.log("Rule5");
    }
  });

  //Rule 6 - Github Copilot Free in my VSCode to with autocomplete; I assume this applies to me
  if (totalNum > 10.0) {
    points += 5;
    console.log("Rule6");
  }

  //Rule 7
  if (purchaseDay % 2 !== 0) {
    points += 6;
    console.log("Rule7");
  }

  //Rule 8
  if (purchaseHour >= 14 && purchaseHour < 16) {
    points += 10;
    console.log("Rule8");
  }

  const receipt: Receipt = {
    id: uuidv4(),
    retailer: retailer,
    purchaseDate: purchaseDate,
    purchaseTime: purchaseTime,
    items: items,
    total: total,
    points: points,
  };

  const dupUUID = receieptsProcessed.findIndex((m) => m.id === receipt.id);

  if (dupUUID) {
    receipt.id = uuidv4();
  }

  receieptsProcessed.push(receipt);

  res.status(201).send({ id: receipt.id });
});

export default router;
