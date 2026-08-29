import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import pymupdf

def generate_resume(output_path):
    # Target 1-page document with balanced vertical distribution
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=44,
        rightMargin=44,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom typography styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=22,
        alignment=1, # Center
        textColor=colors.HexColor('#000000'),
        spaceAfter=3
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=12.5,
        alignment=1,
        textColor=colors.HexColor('#111111'),
        spaceAfter=2
    )

    links_style = ParagraphStyle(
        'LinksStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=12.5,
        alignment=1,
        textColor=colors.HexColor('#111111'),
        spaceAfter=7
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13.5,
        textColor=colors.HexColor('#000000'),
        spaceBefore=9,
        spaceAfter=3.5,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.0,
        leading=12.4,
        alignment=4, # Justified
        textColor=colors.HexColor('#111111'),
        spaceAfter=3
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=12.5,
        textColor=colors.HexColor('#000000'),
        spaceBefore=4.5,
        spaceAfter=1.5
    )

    item_desc_style = ParagraphStyle(
        'ItemDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.0,
        alignment=4, # Justified
        textColor=colors.HexColor('#111111'),
        spaceAfter=4
    )

    story = []

    # Header
    story.append(Paragraph("MALLIKARJUN RATKAL", name_style))
    story.append(Paragraph("@SDMCET, Dharwad 580002 &nbsp;|&nbsp; +91 8073122349 &nbsp;|&nbsp; mallikarjunratkal606@gmail.com", contact_style))
    story.append(Paragraph(
        '<a href="https://www.linkedin.com/in/mallikarjun-ratkal-7a6123308" color="#000000">LinkedIn</a> &nbsp;|&nbsp; '
        '<a href="https://github.com/Mallikarjun-15" color="#000000">GitHub</a> &nbsp;|&nbsp; '
        '<a href="https://mallikarjun-15.github.io/" color="#000000">Portfolio</a>',
        links_style
    ))
    
    # Divider
    story.append(HRFlowable(width="100%", thickness=1.1, color=colors.HexColor('#000000'), spaceBefore=0, spaceAfter=7))

    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    story.append(Paragraph(
        "Artificial Intelligence and Machine Learning (AI/ML) Engineering student with skills in Python, Machine Learning, Deep Learning, "
        "Data Science, and Web Development. Experienced in developing responsive applications, data analysis, predictive modeling, "
        "and AI-based projects. Strong problem-solving and analytical skills with a passion for building practical technology solutions.",
        body_style
    ))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    skills = [
        "<b>Programming Languages:</b> Python, Java, C",
        "<b>Web Development:</b> HTML, CSS, JavaScript, React.js, Node.js",
        "<b>Application Development:</b> Android Studio, React",
        "<b>Database:</b> SQL, Database Management",
        "<b>AI &amp; Data Science:</b> Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing (NLP), Data Science",
        "<b>Core Competencies:</b> Problem Solving, Data Structures and Algorithms, Debugging, Analytical Thinking, Teamwork, Communication"
    ]
    for s in skills:
        story.append(Paragraph(s, ParagraphStyle('SkillItem', parent=body_style, spaceAfter=1.8)))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    edu_list = [
        "<b>B.E. in Artificial Intelligence &amp; Machine Learning</b> — SDMCET, Dharwad | 2023–2027 | CGPA: 7.86",
        "<b>12th Grade</b> — Disha PU College, Kalaburagi | 2021–2023 | 88%",
        "<b>10th Grade</b> — Aradhana English Medium School, Kalaburagi | 2021 | 94.56%"
    ]
    for e in edu_list:
        story.append(Paragraph(e, ParagraphStyle('EduItem', parent=body_style, spaceAfter=2.2)))

    # Internship Experience
    story.append(Paragraph("INTERNSHIP EXPERIENCE", section_heading))
    
    story.append(Paragraph("Artificial Intelligence Intern | CODSOFT | 2026", item_title_style))
    story.append(Paragraph(
        "Completed an Artificial Intelligence internship with practical exposure to Python and machine learning concepts. Worked on "
        "AI-based problem-solving tasks involving machine learning, computer vision, and natural language processing, while "
        "strengthening skills in model development, debugging, implementation, and analytical thinking.",
        item_desc_style
    ))

    story.append(Paragraph("AI/ML and Data Science Intern | InternPe Pvt. Ltd. | 2026", item_title_style))
    story.append(Paragraph(
        "Worked on AI/ML and data science projects involving data preprocessing, data analysis, exploratory data analysis (EDA), and "
        "predictive modeling. Utilized Python, Pandas, NumPy, and Scikit-learn to process datasets, identify patterns, and develop "
        "machine learning solutions.",
        item_desc_style
    ))

    # Projects
    story.append(Paragraph("PROJECTS", section_heading))

    story.append(Paragraph("Smart Hospital Appointment &amp; Patient Management System", item_title_style))
    story.append(Paragraph(
        "Developed a responsive web-based healthcare management application that streamlines appointment scheduling, patient "
        "information management, and doctor coordination. Designed an intuitive interface to improve accessibility and overall user "
        "experience.",
        item_desc_style
    ))

    story.append(Paragraph("Stay Finder of Real-Time Hostel &amp; PG's", item_title_style))
    story.append(Paragraph(
        "Developed a responsive web application for discovering hostels and PG accommodations. Implemented search and filtering "
        "functionality based on location, pricing, and user preferences to provide an efficient and user-friendly accommodation search "
        "experience.",
        item_desc_style
    ))

    story.append(Paragraph("Crop Disease Prediction", item_title_style))
    story.append(Paragraph(
        "Developed an AI-based crop disease prediction system using machine learning and deep learning techniques. Applied image "
        "preprocessing and Convolutional Neural Networks (CNN) to classify crop leaf images and identify diseases, demonstrating "
        "knowledge of computer vision and predictive modeling.",
        item_desc_style
    ))

    doc.build(story)
    print(f"Successfully generated {output_path}")

    # Generate preview image
    doc_pdf = pymupdf.open(output_path)
    print("Page count:", len(doc_pdf))
    page = doc_pdf[0]
    pix = page.get_pixmap(dpi=150)
    preview_path = os.path.join(os.path.dirname(output_path), "resume_preview.png")
    pix.save(preview_path)
    print(f"Preview saved to {preview_path}")

if __name__ == "__main__":
    for d in [r"c:\Users\malli\Desktop\Portfolio\resume", r"c:\Users\malli\Desktop\Portfolio\portfolio\resume"]:
        if os.path.exists(d):
            out_file = os.path.join(d, "Mallikarjun_Ratkal_CV.pdf")
            generate_resume(out_file)
