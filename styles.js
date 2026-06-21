export const styles = {
  appWrapper: { 
    background: 'linear-gradient(135deg, #020617 0%, #0b1329 50%, #0f172a 100%)', 
    minHeight: '100vh', width: '100vw', margin: '0', padding: '0', 
    boxSizing: 'border-box', color: '#ffffff', overflowX: 'hidden'
  },
  navbar: { 
    display: 'flex', justifyContent: 'space-between', padding: '20px 5%', 
    backgroundColor: 'rgba(2, 6, 23, 0.85)', alignItems: 'center', boxSizing: 'border-box', 
    borderBottom: '1px solid #1e293b', position: 'relative', zIndex: '100',
    backdropFilter: 'blur(12px)'
  },
  brandLogo: { fontSize: '24px', fontWeight: '900', letterSpacing: '1px', background: 'linear-gradient(to right, #38bdf8, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  navLinkBrand: { textDecoration: 'none' },
  linkGroup: { display: 'flex', gap: '30px', alignItems: 'center' },
  linkItem: { color: '#94a3b8', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', transition: '0.2s' },
  pageBodyContent: { padding: '40px 5%', width: '100%', boxSizing: 'border-box' },
  viewSectionHeadingTitle: { fontSize: '28px', marginBottom: '35px', borderBottom: '3px solid #3b82f6', width: 'fit-content', paddingBottom: '8px', color: '#ffffff', fontWeight: '800' },
  
  // HIGH-END FULL SCREEN HERO CANVAS WITH GEOMETRIC PATTERN INJECTIONS
    heroLayout: { 
    textAlign: 'center', 
    padding: '140px 40px', 
    borderRadius: '16px', 
    color: '#ffffff', 
    width: '100%', 
    boxSizing: 'border-box',
    
    // LINKED DIRECTLY LIKE AN HTML STYLE ATTRIBUTE
    backgroundImage: 'linear-gradient(rgba(11, 15, 25, 0.7), rgba(17, 24, 39, 0.85)), url("https://img.magnific.com/premium-photo/wildlife-tracks-document-animal-tracks-snow-inviting-viewers-guess-what-wildlife-might-be-nearby_997534-75869.jpg?semt=ais_hybrid&w=740&q=80")',
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    border: '1px solid #1f2937'
  },
  heroHeadingTitle: { fontSize: '54px', margin: '0 0 20px 0', fontWeight: '900', letterSpacing: '-0.5px', lineHeight: '1.2' },
  heroTextSubtitle: { fontSize: '20px', marginBottom: '45px', maxWidth: '750px', margin: '0 auto 45px', lineHeight: '1.7', color: '#cbd5e1', fontWeight: '400' },
  actionBtnHero: { backgroundColor: '#3b82f6', color: '#ffffff', padding: '16px 36px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '17px', display: 'inline-block', boxShadow: '0 8px 20px rgba(59,130,246,0.4)', transition: '0.3s', border: 'none', cursor: 'pointer' },
  
  productGridResponsiveLayout: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '35px', width: '100%', boxSizing: 'border-box' },
  productDisplayCardContainer: { backgroundColor: '#0f172a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', transition: '0.3s' },
  cardInformationContentWrapper: { padding: '24px', display: 'flex', flexDirection: 'column', flex: '1' },
  productLabelNameTextTitle: { fontSize: '20px', margin: '0 0 12px 0', color: '#ffffff', fontWeight: '800' },
  productDescriptionParagraphBlock: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', height: '45px', overflow: 'hidden', margin: '0 0 25px 0' },
  cardActionFooterDataRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  currencyPriceValueStyleTag: { fontSize: '22px', fontWeight: '900', color: '#10b981', fontFamily: 'monospace' },
  interactionPurchaseBtnStyle: { backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' },
  centeredFormWrapperWidthLimit: { maxWidth: '650px', margin: '0 auto', width: '100%' },
  cardFormWhiteSurfaceBoxBackground: { backgroundColor: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' },
  basketRecordRowFlexBorder: { display: 'flex', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #1e293b', marginBottom: '20px', alignItems: 'center' },
  quantityCounterAdjustBtn: { width: '32px', height: '32px', cursor: 'pointer', border: '1px solid #334155', borderRadius: '6px', backgroundColor: '#1e293b', color: '#fff', fontWeight: 'bold' },
  subtotalSummaryRowLabelFlex: { display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', marginTop: '25px', color: '#ffffff' },
  navigationForwardTerminalSubmitBtn: { width: '100%', backgroundColor: '#2563eb', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '8px', marginTop: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  formInputFieldBoxStyle: { padding: '14px', border: '1px solid #334155', borderRadius: '8px', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: '12px', backgroundColor: '#1e293b', color: '#fff' },
  financialTransactionApprovalBtn: { width: '100%', backgroundColor: '#10b981', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '12px' },
  center: { textAlign: 'center', marginTop: '150px', color: '#ffffff' },
  profileBadgeIconCircle: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', userSelect: 'none', border: '2px solid #3b82f6' },
  profileDropdownContainerBox: { position: 'absolute', top: '70px', right: '5%', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px', width: '250px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '14px', zIndex: '999' }
};
