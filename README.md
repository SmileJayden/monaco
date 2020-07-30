# simple monaco app

Upload zip file


 - zip 파일 업로드, 다운로드 할 수 있습니다.
 - zip 파일을 업로드하면, 좌측 FileTree에 tree 형태로 file 과 folder가 보입니다
 - 수정할 수 없는 파일중 확장자가 jpg, jpeg, png, ico 인 파일은 img로 보여줍니다
 - Tab 파일은 열고닫을 수 있으며, 지금 monaco editor 화면에 보여지고있는 파일이면 tab상의 왼쪽에 있는 파일이 열립니다
 - undo, redo는 각각 cmd+Z, cmd+R에 바인딩 되어있습니다
 - 파일을 수정 할 경우, 500ms의 debounce 후에 저장됩니다. download 버튼을 누르면 로컬컴퓨터에 zip파일로 저장됩니다
 
 
