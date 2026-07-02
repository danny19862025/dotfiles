{
  "layer": "top",
  "position": "top",
  "height": 36,

  "modules-left": [
    
  ],

  "modules-center": [
    "hyprland/workspaces"
  ],

  "modules-right": [
   "clock"
    "pulseaudio",
    "network",
    "bluetooth",
    "battery",
    "tray"
  ],

  "hyprland/workspaces": {
    "format": "{name}"
  },

  "clock": {
    "format": "  {:%I:%M %p}"
  },

  "battery": {
    "format": "  {capacity}%"
  },

  "network": {
    "format-wifi": "  {signalStrength}%",
    "format-ethernet": "󰈀 Connected",
    "format-disconnected": "󰖪 Offline"
  },

  "pulseaudio": {
    "format": "  {volume}%"
  },

  "bluetooth": {
    "format": ""
  },

  "tray": {
    "spacing": 10
  }
}
