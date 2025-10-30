const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SHIPMENTS_FILE = path.join(__dirname, 'shipments.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize shipments.json if it doesn't exist
async function initializeShipmentsFile() {
  try {
    await fs.access(SHIPMENTS_FILE);
  } catch {
    await fs.writeFile(SHIPMENTS_FILE, JSON.stringify([], null, 2));
    console.log('Created shipments.json file');
  }
}

// Read shipments from file
async function readShipments() {
  try {
    const data = await fs.readFile(SHIPMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading shipments:', error);
    return [];
  }
}

// Write shipments to file
async function writeShipments(shipments) {
  try {
    await fs.writeFile(SHIPMENTS_FILE, JSON.stringify(shipments, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing shipments:', error);
    return false;
  }
}

// GET all shipments
app.get('/api/shipments', async (req, res) => {
  try {
    const shipments = await readShipments();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipments' });
  }
});

// GET single shipment by ID
app.get('/api/shipments/:id', async (req, res) => {
  try {
    const shipments = await readShipments();
    const shipment = shipments.find(s => s.id === req.params.id);
    
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipment' });
  }
});

// POST create new shipment
app.post('/api/shipments', async (req, res) => {
  try {
    const { name, id, supply, initLoc, finalLoc, date } = req.body;
    
    // Validate required fields
    if (!name || !id || !supply || !initLoc || !finalLoc || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const shipments = await readShipments();
    
    // Check if ID already exists
    if (shipments.some(s => s.id === id)) {
      return res.status(400).json({ error: 'Shipment ID already exists' });
    }
    
    const newShipment = {
      name,
      id,
      supply,
      initLoc,
      finalLoc,
      date
    };
    
    shipments.push(newShipment);
    const success = await writeShipments(shipments);
    
    if (!success) {
      return res.status(500).json({ error: 'Failed to save shipment' });
    }
    
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shipment' });
  }
});

// PUT update shipment
app.put('/api/shipments/:id', async (req, res) => {
  try {
    const { name, supply, initLoc, finalLoc, date } = req.body;
    const shipments = await readShipments();
    const index = shipments.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    
    // Update shipment (keep the original ID)
    shipments[index] = {
      ...shipments[index],
      name: name || shipments[index].name,
      supply: supply || shipments[index].supply,
      initLoc: initLoc || shipments[index].initLoc,
      finalLoc: finalLoc || shipments[index].finalLoc,
      date: date || shipments[index].date
    };
    
    const success = await writeShipments(shipments);
    
    if (!success) {
      return res.status(500).json({ error: 'Failed to update shipment' });
    }
    
    res.json(shipments[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shipment' });
  }
});

// DELETE shipment
app.delete('/api/shipments/:id', async (req, res) => {
  try {
    const shipments = await readShipments();
    const filteredShipments = shipments.filter(s => s.id !== req.params.id);
    
    if (shipments.length === filteredShipments.length) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    
    const success = await writeShipments(filteredShipments);
    
    if (!success) {
      return res.status(500).json({ error: 'Failed to delete shipment' });
    }
    
    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shipment' });
  }
});

// Initialize and start server
initializeShipmentsFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Shipments file: ${SHIPMENTS_FILE}`);
  });
});