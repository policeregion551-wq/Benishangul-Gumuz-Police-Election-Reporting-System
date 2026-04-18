import React from "react";

// Benishangul Gumuz Police Election Reporting System Documentation
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
  // Simple custom parser to avoid external dependencies
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold golden-text mb-6 pb-2 border-b border-gold/20 text-center">{line.substring(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold text-gold mt-8 mb-4 border-l-4 border-gold pl-3">{line.substring(3)}</h2>;
    if (line.startsWith('* ')) return <li key={index} className="ml-4 list-disc text-neutral-300 mb-2">{line.substring(2)}</li>;
    if (line.match(/^\d+\./)) return <li key={index} className="ml-4 list-decimal text-neutral-300 mb-2">{line.substring(line.indexOf('.') + 1).trim()}</li>;
    if (line.trim() === '') return <br key={index} />;
    
    // Bold text handling
    const parts = line.split(/(\*\*.*?\*\*)/);
    return (
      <p key={index} className="text-neutral-400 mb-3 leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-bold">{part.substring(2, part.length - 2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  };

  return (
    <div className="glass-card p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-neutral-900/30 p-4 md:p-8 rounded-2xl overflow-hidden">
        {documentationText.split('\n').map((line, index) => renderLine(line, index))}
      </div>
    </div>
  );
};
