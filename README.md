# NetFortify Frontend

## Frontend for a network weakness finder by simulation. This project provides a user interface to upload a network graph, run attack simulations, and visualize the results in real-time.

## You can access backend for the same here 
```bash
https://github.com/rahulaharma/NetFortify
```

---

## ✨ Key Features

* **Network Graph Upload**: Users can upload an edge list file representing the network graph.

* **Attack Strategy Selection**: Choose between "Random Failure" and "Targeted Attack" strategies to simulate network attacks.

* **Live Simulation Monitoring**: View real-time metrics of the simulation, including the number of nodes removed and the size of the largest connected component.

* **Real-time Visualization**: A line chart visualizes the network resilience by plotting the size of the largest connected component against the percentage of nodes removed.

* **Connection Status**: The header displays the connection status to the backend server.


## 🚀 Technologies Used

* **React**: A JavaScript library for building user interfaces.

* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

**Axios**: A promise-based HTTP client for making requests to the backend API.

* **SockJS & StompJS**: For WebSocket communication to receive real-time updates from the server.

* **Recharts**: A composable charting library built on React components.

* **Parcel**: A web application bundler.

* **React Toastify**: For displaying notifications.


## 🛠️ Installation & Setup

Follow these steps to get the development environment running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/rahulaharma/netfortify_frontend.git
```

### 2. Navigate to the project directory:

```bash
cd netfortify_frontend
```

### 3. Install the dependencies:
```bash
npm install
```

## Usage

### 1. Start the development server:

```bash
npm start
```

### 2. Open your browser and go to 
```bash
http://localhost:1234.
```

## API Integration

The frontend communicates with a backend server running on http://localhost:8080/api. The following API calls are made:

POST /api/graph/upload: Uploads the network graph file.

POST /api/graph/simulate?strategy={strategy}: Starts the simulation with the selected strategy.


## Real-time Updates
The application uses SockJS and StompJS to establish a WebSocket connection to /ws on the backend server. It subscribes to the /topic/metrics endpoint to receive live simulation data and updates the UI accordingly.

## Author
Rahul Sharma


