export const fetchData = async () => {
  try {
    const response = await fetch("/Gps_data.json");
    if (!response.ok) {
      throw new Error("response error");
    }
      const data = await response.json();

    const latLngs = data.map((vehicle) => [vehicle.latitude, vehicle.longitude]);

      const stoppages = data
          .filter((vehicle) => vehicle.speed === 0)
          .map((vehicle, index, arr) => {
              const reachTime = new Date(vehicle.eventGeneratedTime);
              const endTime = index < arr.length - 1
                  ? new Date(arr[index + 1].eventGeneratedTime)
                  : new Date(vehicle.eventGeneratedTime);
              const duration = (endTime - reachTime) / (60000);
              return {
                  position: [vehicle.latitude, vehicle.longitude],
                  reachTime: reachTime.toLocaleString(),
                  endTime: endTime.toLocaleString(),
                  duration: duration.toFixed(2),
              };
          });

    return { latLngs, stoppages };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { latLngs: [], stoppages: [] };
  }
};
