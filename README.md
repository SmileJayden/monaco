# simple monaco app

Upload zip file


 - zip 파일 업로드, 다운로드 할 수 있습니다.
 - zip 파일을 업로드하면, 좌측 FileTree에 tree 형태로 file 과 folder가 보입니다
 - zip 파일을 읽고 쓰는건 JSZip 라이브러리 이용햇고, base64으로 읽고 씁니다
 - base64로 인코딩된 data를 decoding 하는건 js-base64 library를 이용했고, decoding에 실패하는 파일들은 수정할 수 없는 파일로 간주합니다
 - 수정할 수 없는 파일중 확장자가 jpg, jpeg, png, ico 인 파일은 img로 보여줍니다
 - Tab 파일은 열고닫을 수 있으며, 지금 monaco editor 화면에 보여지고있는 파일이면 tab상의 왼쪽에 있는 파일이 열립니다
 - undo, redo는 각각 cmd+Z, cmd+R에 바인딩 되어있습니다
 - 파일을 수정 할 경우, 500ms의 debounce 후에 저장됩니다. download 버튼을 누르면 로컬컴퓨터에 zip파일로 저장됩니다
 - 더 많은 시간을 쓸 수 없어 a11y, i18n, test 등은 생략하고자합니다.
