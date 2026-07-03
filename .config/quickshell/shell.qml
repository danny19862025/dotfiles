import Quickshell
import QtQuick

ShellRoot {
  PanelWindow {
    anchors {
      top: true
      left: true
      right: true
    }

    implicitHeight: 36
    color: "#1a1b26cc"

    Rectangle {
      anchors.fill: parent
      color: "transparent"

      Text {
        anchors.centerIn: parent
        text: "Danny 😎  |  NixOS + Hyprland"
        color: "#7dcfff"
        font.pixelSize: 16
        font.family: "FantasqueSansM Nerd Font"
      }

      Text {
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: parent.left
        anchors.leftMargin: 18
        text: ""
        color: "#7aa2f7"
        font.pixelSize: 20
        font.family: "FantasqueSansM Nerd Font"
      }

      Text {
        anchors.verticalCenter: parent.verticalCenter
        anchors.right: parent.right
        anchors.rightMargin: 18
        text: Qt.formatDateTime(new Date(), "hh:mm")
        color: "#bb9af7"
        font.pixelSize: 16
        font.family: "FantasqueSansM Nerd Font"
      }
    }
  }
}
