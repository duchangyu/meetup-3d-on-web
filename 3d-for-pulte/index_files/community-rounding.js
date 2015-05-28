// ROUNDED CORNERS - Community Pages, Plan Page, and Inventory Home Page

var roundedCorners = function(){ 
   if (getCurrSite()=='Pulte') {
      Rounded('cHdr','div','top','transparent','#5691BE'); // cool button, community hdr
      Rounded('cFtr','div','bottom','transparent','#0E4073'); // cool button, community ftr
      Rounded('alertHdr','div','top','transparent','#C96625'); // alert bar
      Rounded('alertFtr','div','bottom','transparent','#B55918'); // alert bar
      Rounded('contactUsCorners','div','all','transparent','#F5F9FD'); // contact us
      Rounded('myNotebookCorners','div','all','transparent','#F5F9FD'); // my notebook
      Rounded('sharePanelCorners','div','all','transparent','#F5F9FD'); // my notebook share panel
      Rounded('comparePanelCorners','div','all','transparent','#F5F9FD'); // my notebook compare panel
      Rounded('messageArea','div','all','transparent','#B35817'); // my notebook ask to register
      Rounded('signInCorners','div','all','transparent','#F5F9FD'); // my notebook sign in
      Rounded('driveDirectionsCorners','div','all','transparent','#F5F9FD'); // my notebook driving directions
      Rounded('errorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
      Rounded('PWerrorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
      Rounded('newPWerrorMessageArea','div','all','transparent','#B35817'); // my notebook error messages
      Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #9EC7E6'); // content info boxes
      Rounded('tfFormCorners','div','all','transparent','#FFF','border #9EC7E6'); // tell a friend form

      // community header
      Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
      Rounded('sHdr','div','top','transparent','#5691BE'); // cool button, community summary hdr
      Rounded('sFtr','div','bottom','transparent','#0E4073'); // cool button, community summary ftr

      // Plan Gallery
      Rounded('masterPlanCommunity','div','all','transparent','#C5A35A'); // MasterPlan Gallery sections
   }

   if (getCurrSite()=='DelWebb') {
      Rounded('cHdr','div','top','transparent','#0E4073','border #0B3D70'); // cool button, community hdr
      Rounded('cFtr','div','bottom','transparent','#5B85B7','border #0B3D70'); // cool button, community ftr
      Rounded('alertHdr','div','top','transparent','#86270b'); // alert bar
      Rounded('alertFtr','div','bottom','transparent','#993416'); // alert bar
      Rounded('subfooter','div','all','transparent','#FFF'); // footer
      Rounded('contactUsCorners','div','all','transparent','#E6F0FB'); // contact us

      // community header
      Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
      Rounded('sHdr','div','top','transparent','#5691BE'); // cool button, community summary hdr
      Rounded('sFtr','div','bottom','transparent','#0E4073'); // cool button, community summary ftr

      Rounded('tfFormCorners','div','all','transparent','#FFF','border #739BCC'); // tell a friend form
      Rounded('myNotebookCorners','div','all','transparent','#E6F0FB'); // my notebook
      Rounded('sharePanelCorners','div','all','transparent','#E6F0FB'); // my notebook share panel
      Rounded('comparePanelCorners','div','all','transparent','#E6F0FB'); // my notebook compare panel
      Rounded('messageArea','div','all','transparent','#993416'); // my notebook ask to register
      Rounded('signInCorners','div','all','transparent','#E6F0FB'); // my notebook sign in
      Rounded('driveDirectionsCorners','div','all','transparent','#E6F0FB'); // my notebook driving directions
      Rounded('errorMessageArea','div','all','transparent','#993416'); // my notebook error messages
      Rounded('PWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
      Rounded('newPWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
      Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #CBD24C'); // content info boxes

      // Plan Gallery
      Rounded('masterPlanCommunity','div','all','transparent','#AFB720'); // MasterPlan Gallery sections
   }

   if (getCurrSite()=='DiVosta') {
      Rounded('cHdr','div','top','transparent','#C4D3B3'); // cool button, community hdr
      Rounded('cFtr','div','bottom','transparent','#95AF83'); // cool button, community ftr
      Rounded('alertHdr','div','top','transparent','#72250C'); // alert bar
      Rounded('alertFtr','div','bottom','transparent','#8F371B'); // alert bar
      Rounded('contactUsCorners','div','all','transparent','#E8F2F9'); // contact us
      Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #CEDEBB'); // content info boxes

      // community header
      Rounded('communitySummaryBox','div','top','transparent','#FFF','border #9EC7E6');
      Rounded('sHdr','div','top','transparent','#5691BE'); // cool button, community summary hdr
      Rounded('sFtr','div','bottom','transparent','#0E4073'); // cool button, community summary ftr

      Rounded('tfFormCorners','div','all','transparent','#FFF','border #94AE82'); // tell a friend form
      Rounded('myNotebookCorners','div','all','transparent','#E8F2F9'); // my notebook
      Rounded('sharePanelCorners','div','all','transparent','#E8F2F9'); // my notebook share panel
      Rounded('comparePanelCorners','div','all','transparent','#E8F2F9'); // my notebook compare panel
      Rounded('messageArea','div','all','transparent','#90381C'); // my notebook ask to register
      Rounded('signInCorners','div','all','transparent','#E8F2F9'); // my notebook sign in
      Rounded('driveDirectionsCorners','div','all','transparent','#E8F2F9'); // my notebook driving directions
      Rounded('errorMessageArea','div','all','transparent','#90381C'); // my notebook error messages

      // Plan Gallery
      Rounded('masterPlanCommunity','div','all','transparent','#94AE82'); // MasterPlan Gallery sections
   }

   if (getCurrSite()=='Centex') {
      Rounded('cHdr','div','top','transparent','#403B65','border #403B65'); // cool button, community hdr
      Rounded('cFtr','div','bottom','transparent','#2D2B46','border #2D2B46'); // cool button, community ftr
      Rounded('alertHdr','div','top','transparent','#B3B39F'); // alert bar
      Rounded('alertFtr','div','bottom','transparent','#7B7B6B'); // alert bar
      Rounded('subfooter','div','all','transparent','#FFF'); // footer
      Rounded('contactUsCorners','div','all','transparent','#F6F6EE'); // contact us

      // community header
      Rounded('communitySummaryBox','div','top','transparent','#FFF','border #403B65');

      Rounded('paymentSummaryBox','div','all','transparent','#F6F6EE','border #CD202C');

      Rounded('mHdr','div','top','transparent','#CD202C'); // cool button, lowest monthly paymnet hdr
      Rounded('mFtr','div','bottom','transparent','#B5151D'); // cool button, lowest monthly paymnet ftr

      Rounded('sHdr','div','top','transparent','#403B65'); // cool button, community summary hdr
      Rounded('sFtr','div','bottom','transparent','#2D2B46'); // cool button, community summary ftr

      Rounded('tfFormCorners','div','all','transparent','#FFF','border #D0D1B4'); // tell a friend form
      Rounded('myNotebookCorners','div','all','transparent','#D0D1B4'); // my notebook
      Rounded('sharePanelCorners','div','all','transparent','#D0D1B4'); // my notebook share panel
      Rounded('comparePanelCorners','div','all','transparent','#D0D1B4'); // my notebook compare panel
      Rounded('messageArea','div','all','transparent','#993416'); // my notebook ask to register
      Rounded('signInCorners','div','all','transparent','#D0D1B4'); // my notebook sign in
      Rounded('driveDirectionsCorners','div','all','transparent','#F6F6EE'); // my notebook driving directions
      Rounded('errorMessageArea','div','all','transparent','#993416'); // my notebook error messages
      Rounded('PWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
      Rounded('newPWerrorMessageArea','div','all','transparent','#993416'); // my notebook error messages
      Rounded('infoBoxCornersNB','div','all','transparent','#FFF','border #7B7B6B'); // content info boxes

      // Plan Gallery
      Rounded('masterPlanCommunity','div','all','transparent','#D0D1B4'); // MasterPlan Gallery sections
   }

}
