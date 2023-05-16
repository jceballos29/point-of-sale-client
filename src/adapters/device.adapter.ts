import { Device, DeviceResponse } from "@/types"

export const deviceAdapter = (response: DeviceResponse[]) => {
  const result: Device[] = response.map((device: DeviceResponse) => {
    return {
      id: device._id,
      name: device.name
    }
  })

  return result
}