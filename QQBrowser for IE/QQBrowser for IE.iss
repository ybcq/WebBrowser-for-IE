; Inno Setup 配置文件
; 自动生成自旧格式配置文件

[Setup]
; 基本设置
AppId={QQ浏览器IE内核去升级版}
AppName=QQ浏览器IE内核去升级版
AppVersion=8.2.4257.400
AppVerName=QQ浏览器IE内核去升级版 8.2.4257.400
AppPublisher=御坂初琴の软件屋
AppPublisherURL=https://ybcq.github.io/
AppSupportURL=https://github.com/ybcq/
AppUpdatesURL=https://github.com/ybcq/
DefaultDirName={autopf}\QQ浏览器IE内核
DefaultGroupName=QQ浏览器IE内核去升级版
AllowNoIcons=yes
OutputBaseFilename=QQ浏览器IE内核去升级版
Compression=lzma
SolidCompression=yes
SetupIconFile=E:\软件工程\#软件修改工具\安装包制作工具\I图标I.ico
WizardImageFile=E:\Projects\@安装包配图\标题图像.bmp
LicenseFile=E:\Projects\@软件协议\协议.txt

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "chinese"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode

[Files]
Source: "D:\Visual_Disk\QQ浏览器去升级版\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\QQ浏览器IE内核去升级版"; Filename: "{app}\QQBrowser.exe"
Name: "{autodesktop}\QQ浏览器IE内核去升级版"; Filename: "{app}\QQBrowser.exe"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\QQ浏览器IE内核去升级版"; Filename: "{app}\QQBrowser.exe"; Tasks: quicklaunchicon

[Code]
// 自定义初始化过程
function InitializeSetup(): Boolean;
begin
  Result := True;
end;
