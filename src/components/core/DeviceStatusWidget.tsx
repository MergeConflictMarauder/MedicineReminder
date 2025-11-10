import React from 'react';
import { Device } from '../../types';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Battery, Wifi, WifiOff, Box, AlertTriangle, CheckCircle, Thermometer } from 'lucide-react';
import { Progress } from '../ui/progress';

interface DeviceStatusWidgetProps {
  device: Device | null;
  variant?: 'compact' | 'detailed';
}

export function DeviceStatusWidget({ device, variant = 'compact' }: DeviceStatusWidgetProps) {
  if (!device) {
    return (
      <Card className="p-4 bg-gray-50 border-dashed">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Box size={24} className="opacity-50" />
          <div>
            <p className="text-sm">No device connected</p>
            <p className="text-xs">Running in standalone mode</p>
          </div>
        </div>
      </Card>
    );
  }

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConnectivityIcon = () => {
    if (device.connectivity === 'connected') return Wifi;
    return WifiOff;
  };

  const getConnectivityColor = () => {
    if (device.connectivity === 'connected') return 'text-green-600';
    if (device.connectivity === 'weak') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrayStatusIcon = () => {
    if (device.trayStatus === 'ready') return CheckCircle;
    if (device.trayStatus === 'error') return AlertTriangle;
    return Box;
  };

  const getTrayStatusColor = () => {
    if (device.trayStatus === 'ready') return 'text-green-600';
    if (device.trayStatus === 'error') return 'text-red-600';
    return 'text-gray-600';
  };

  const ConnectivityIcon = getConnectivityIcon();
  const TrayIcon = getTrayStatusIcon();
  const avgTemp = device.temps.reduce((a, b) => a + b, 0) / device.temps.length;

  if (variant === 'compact') {
    return (
      <Card className="p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Box size={20} className="text-blue-600" />
            <div>
              <p className="text-sm">Device #{device.serial.slice(-4)}</p>
              <p className="text-xs text-muted-foreground">v{device.firmware}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Battery size={16} className={getBatteryColor(device.battery)} />
              <span className="text-xs">{device.battery}%</span>
            </div>

            <ConnectivityIcon
              size={16}
              className={getConnectivityColor()}
            />

            <TrayIcon
              size={16}
              className={getTrayStatusColor()}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Box size={24} className="text-blue-600" />
          </div>
          <div>
            <h4 className="mb-0.5">Smart Pill Dispenser</h4>
            <p className="text-sm text-muted-foreground">Serial: {device.serial}</p>
            <p className="text-xs text-muted-foreground">Firmware: {device.firmware}</p>
          </div>
        </div>

        <Badge
          variant={device.connectivity === 'connected' ? 'default' : 'destructive'}
          className="gap-1"
        >
          <ConnectivityIcon size={14} />
          {device.connectivity}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Battery size={16} className={getBatteryColor(device.battery)} />
            <span className="text-sm">Battery</span>
          </div>
          <Progress value={device.battery} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{device.battery}%</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={16} className="text-blue-600" />
            <span className="text-sm">Temperature</span>
          </div>
          <p className="text-xs text-muted-foreground">Avg: {avgTemp.toFixed(1)}°C</p>
          <p className="text-xs text-muted-foreground">Range: {Math.min(...device.temps).toFixed(1)}°C - {Math.max(...device.temps).toFixed(1)}°C</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Tray Status</span>
          <Badge
            variant={device.trayStatus === 'ready' ? 'default' : device.trayStatus === 'error' ? 'destructive' : 'secondary'}
            className="gap-1 text-xs"
          >
            <TrayIcon size={12} />
            {device.trayStatus}
          </Badge>
        </div>
      </div>

      <div>
        <p className="text-sm mb-2">Compartments ({device.compartments.length})</p>
        <div className="grid grid-cols-4 gap-2">
          {device.compartments.map((comp) => (
            <div
              key={comp.number}
              className={`
                p-2 rounded text-center text-xs border-2
                ${comp.status === 'filled' ? 'bg-green-50 border-green-200 text-green-700' : ''}
                ${comp.status === 'low' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : ''}
                ${comp.status === 'empty' ? 'bg-gray-50 border-gray-200 text-gray-500' : ''}
              `}
            >
              <div>#{comp.number}</div>
              <div className="text-xs opacity-75">{comp.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <p className="text-xs text-muted-foreground">
          Last sync: {new Date(device.lastSync).toLocaleString()}
        </p>
      </div>
    </Card>
  );
}
