import React from "react";
import ReactMarkdown from "react-markdown";

const documentationText = `# የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን የ7ኛው አገራዊ እና ክልላዊ ምርጫ የጸጥታ ሪፖርት ማቅረቢያ ሲስተም ሰነድ (PROJECT DOCUMENTATION)

## 1. መግቢያ (Introduction)
ይህ የጸጥታ ሪፖርት ማቅረቢያ ሲስተም በቤንሻንጉል ጉሙዝ ክልል የሚካሄደውን 7ኛው አገራዊ እና ክልላዊ ምርጫ ሰላማዊ እና ደህንነቱ የተጠበቀ እንዲሆን ለማስቻል የተገነባ የቴክኖሎጂ ውጤት ነው:: ሲስተሙ በክልል፣ በዞን እና በወረዳ ደረጃ ያሉ የፖሊስ መዋቅሮች መረጃን በፍጥነት፣ በጥራት እና በደህንነት እንዲለዋወጡ ያስችላል::

## 2. አላማ (Objective)
የሲስተሙ ዋና አላማ በምርጫ ወቅት የሚከሰቱ የጸጥታ ሁኔታዎችን እና የወንጀል ክስተቶችን በዲጂታል መንገድ በወቅቱ ለሚመለከተው አካል ሪፖርት በማድረግ ፈጣን የውሳኔ አሰጣጥ ሂደትን መደገፍ ነው::

## 3. ግብ (Goal)
*   የወረቀት ሪፖርት ልውውጥን በማስቀረት መረጃን በዲጂታል መንገድ ማደራጀት::
*   በወረዳና በዞን ደረጃ ያሉ የጸጥታ ሁኔታዎችን በሪል-ታይም (Real-time) መከታተል::
*   የምርጫ ሂደቱን የሚያስተጓጉሉ ወንጀሎችን በዝርዝር መመዝገብ እና ለህግ ማስከበር ስራ ግብአት ማድረግ::
*   ከፍተኛ የጸጥታ አመራሮች ትክክለኛ መረጃ ላይ ተመስርተው ውሳኔ እንዲሰጡ መርዳት::

## 4. መነሻ ሁኔታ (Background/Problem Statement)
ከዚህ ቀደም የነበሩ የሪፖርት አቀራረብ ሂደቶች በስልክ ግንኙነት ወይም በወረቀት ላይ የተመሰረቱ በመሆናቸው:
*   መረጃዎች በወቅቱ አለመድረስ::
*   የመረጃ ትክክለኛነት እና ደህንነት ጥርጣሬ ውስጥ መውደቅ::
*   ሪፖርቶችን መልሶ ለማደራጀት እና ለትንታኔ ለመጠቀም መቸገር::
*   ባለፉት ምርጫዎች የታዩ የመረጃ መዘግየት ችግሮችን ለመፍታት ይህ ሲስተም እንደ መፍትሄ ቀርቧል::

## 5. የሲስተሙ አጠቃቀም (System Usage)
ሲስተሙ ሶስት ዋና ዋና የተጠቃሚ ደረጃዎች አሉት:
1.  **የክልል አድሚን (Regional Admin):** ተጠቃሚዎችን ይመዘግባል፣ ሁሉንም የክልሉን ሪፖርቶች ይከታተላል፣ አጠቃላይ ዳሽቦርድ እና ግራፎችን ይመለከታል::
2.  **የዞን ፖሊስ (Zone Police):** በዞኑ ስር ያሉ ወረዳዎች የላኩትን ሪፖርት ይከታተላል:: አስፈላጊ ሆኖ ሲገኝ (የወረዳ ኔትዎርክ ካልሰራ) በወረዳው ስም ሪፖርት ያቀርባል::
3.  **የወረዳ ፖሊስ (Woreda Police):** በየሰዓቱ ወይም ክስተቶች ሲኖሩ ሪፖርት ያቀርባል:: ሪፖርቱ "ሰላም ነው" ወይም "ወንጀል ተከስቷል" በሚል በሁለት ይከፈላል::

## 6. የሲስተሙ ጥቅም (Benefits)
*   **ፍጥነት:** ሪፖርቱ እንደተላከ በሰከንዶች ውስጥ ክልል ኮሚሽን ይደርሳል::
*   **ተደራሽነት:** በየትኛውም ቦታ ሆኖ በኢንተርኔት መጠቀም ይቻላል::
*   **ትንታኔ:** በግራፍ እና በቁጥር የተደገፈ መረጃ ስለሚሰጥ ሁኔታዎችን በቀላሉ ለመረዳት ይረዳል::
*   **ደህንነት:** መረጃው በክላውድ (Cloud) ላይ ስለሚቀመጥ አይጠፋም፣ አይሰረዝም::
*   **ህትመት:** እያንዳንዱን ሪፖርት ወደ PDF መቀየር እና ፕሪንት ማድረግ ይቻላል::

## 7. የሚያስፈልገው የሰው ሀይል (Required Human Power)
*   **ሲስተም አድሚኒስትሬተር (1):** አጠቃላይ ሲስተሙን የሚቆጣጠር እና ተጠቃሚዎችን የሚያስተዳድር::
*   **የዞን መረጃ ባለሙያዎች (በየዞኑ):** ከወረዳ የሚመጡ መረጃዎችን የሚከታተሉ::
*   **የወረዳ ሪፖርት አቅራቢዎች (በየወረዳው):** መረጃዎችን በየእለቱ የሚልኩ የፖሊስ አባላት::
*   **ቴክኒካል ድጋፍ ሰጪዎች:** የኔትዎርክ እና የኮምፒውተር ችግሮችን የሚፈቱ::

## 8. የሚያስፈልገው ማቴሪያል (Required Materials)
*   **ሃርድዌር:** ኮምፒውተሮች (Laptops/Desktops) ወይም ስማርት ስልኮች (Tablets/Phones)::
*   **ኔትዎርክ:** የተረጋጋ ኢንተርኔት (4G/Wi-Fi)::
*   **ሶፍትዌር:** ዘመናዊ የኢንተርኔት ብሮውዘሮች (Chrome, Edge, Safari)::
*   **ክላውድ ሰርቨር:** ለዳታቤዝ እና ለፋይል ማከማቻ (Firebase)::

## 9. ባለድርሻ አካላት (Stakeholders)
*   የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን::
*   የፌደራል ፖሊስ ኮሚሽን::
*   የኢትዮጵያ ብሄራዊ ምርጫ ቦርድ::
*   የክልሉ ሰላም እና ጸጥታ ቢሮ::

## 10. ሲስተሙን ያበለፀጉት (Developers)
ይህ ሲስተም በቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን የቴክኖሎጂ ማስፋፊያ እና ዲጂታል ትራንስፎርሜሽን ቡድን (BG Police Technology Expansion Team) የበለጸገ ሲሆን በዘመናዊ የሶፍትዌር ስነ-ጥበብ (React, TypeScript እና Firebase) የተገነባ ነው::

## 11. ማጠቃለያ (Conclusion)
የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ምርጫ ሪፖርት ማቅረቢያ ሲስተም የክልሉን ፖሊስ የመረጃ ልውውጥ ወደ ላቀ ደረጃ የሚያሸጋግር ፕሮጀክት ነው:: ይህ ሲስተም ተግባራዊ መሆኑ የምርጫ ሂደቱ በሰላም እንዲጠናቀቅ እና ማንኛውም የጸጥታ ችግር በወቅቱ ታውቆ መፍትሄ እንዲሰጠው ትልቅ ሚና ይጫወታል:: የቴክኖሎጂ አጠቃቀማችንን በማሳደግ የህዝባችንን ሰላም እናረጋግጣለን::
`;

export const ProjectDocumentation: React.FC = () => {
  return (
    <div className="glass-card p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="prose prose-invert prose-gold max-w-none">
        <div className="markdown-body">
          <ReactMarkdown>{documentationText}</ReactMarkdown>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-body h1 { font-family: sans-serif; font-size: 1.875rem; font-weight: 800; color: #B8860B; margin-bottom: 2rem; border-bottom: 2px solid rgba(184, 134, 11, 0.2); padding-bottom: 0.5rem; text-align: center; line-height: 1.2; }
        .markdown-body h2 { font-size: 1.5rem; font-weight: 700; color: #B8860B; margin-top: 2rem; margin-bottom: 1rem; border-left: 4px solid #B8860B; padding-left: 0.75rem; }
        .markdown-body h3 { font-size: 1.25rem; font-weight: 600; color: #d4d4d4; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .markdown-body p { color: #a3a3a3; line-height: 1.8; margin-bottom: 1.25rem; font-size: 0.9375rem; }
        .markdown-body ul { list-style-type: none; padding-left: 0; margin-bottom: 1.25rem; }
        .markdown-body li { position: relative; padding-left: 1.5rem; color: #d4d4d4; margin-bottom: 0.5rem; font-size: 0.875rem; }
        .markdown-body li::before { content: "•"; position: absolute; left: 0; color: #B8860B; font-weight: bold; }
        .markdown-body strong { color: #ffffff; font-weight: 600; }
      ` }} />
    </div>
  );
};
