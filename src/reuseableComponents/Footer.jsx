import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Apple as AppleIcon,
  Android as AndroidIcon,
} from "@mui/icons-material";

const Footer = () => {
  const footerLinks = {
    'Get to Know Us': [
      { text: 'About', href: '#about' },
      { text: 'Contact Us', href: '#contact' },
      { text: 'FAQs', href: '#faqs' },
      { text: 'Delivery Information', href: '#delivery' }
    ],
    'Let us help you': [
      { text: 'Privacy Policy', href: '#privacy' },
      { text: 'Terms & Conditions', href: '#terms' },
      { text: 'Warranty Policy', href: '#warranty' },
      { text: 'Return Information', href: '#returns' }
    ]
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        mt: "auto",
        py: 4,
      }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
            // flexDirection: { xs: 'column', md: 'row' },
            mb: 4
          }}>
        
          <Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  backgroundColor: "#e0e0e0",
                  p: 1,
                  mb: 4,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Logo
              </Typography>
            </Box>

            {/* Mobile App Download Buttons */}
            <Box>
              <Box sx={{display: 'flex', 
                gap:4
              }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    backgroundColor: "black",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    cursor: "pointer",
                    minWidth: 160,
                    "&:hover": {
                      backgroundColor: "grey.800",
                    },
                  }}
                >
                  <AndroidIcon sx={{fontSize : 30}}/>
                  <Box>
                    <Typography variant="caption">
                      GET IT ON
                    </Typography>
                    <Typography variant="body1">
                      Google Play
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:'space-between',
                    backgroundColor: "black",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    cursor: "pointer",
                    minWidth: 160,
                    "&:hover": {
                      backgroundColor: "grey.800",
                    },
                  }}
                >
                  <AppleIcon sx={{fontSize : 30}}/>
                  <Box>
                    <Typography variant="caption">
                      Download on the
                    </Typography>
                    <Typography variant="body1">
                      App Store
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              gap: { xs: 3, md: 6 },
              flexDirection: { xs: 'column', sm: 'row' },
              flex: { xs: '1 1 100%', md: '1 1 auto' }
            }}>
            {Object.entries(footerLinks).map(([title, links]) => (
              <Box
                key={title}
                sx={{
                  minWidth: { xs: 'auto', sm: '180px' }
                }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "text.primary",
                    fontSize: "1rem",
                  }}>
                  {title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {links.map((link) => (
                    <Link
                      key={link.text}
                      href={link.href}
                      sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          color: "primary.main",
                          textDecoration: "underline",
                        },
                      }}>
                      {link.text}
                    </Link>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        
        <Divider sx={{ my: 3 }} />

        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}>
          
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
            }}>
            Full Copyright & Design By{" "}
            <Link
              href="#"
              sx={{
                color: "text.primary",
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}>
              @Baladi
            </Link>{" "}
            - 2025
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {[
              { icon: TwitterIcon, color: "#1DA1F2" },
              { icon: FacebookIcon, color: "#1877F2" },
              { icon: InstagramIcon, color: "#E4405F" },
              { icon: YouTubeIcon, color: "#FF0000" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <IconButton
                  key={index}
                  size="small"
                  sx={{ backgroundColor: social.color, color: "white", width: 32, height: 32,
                    "&:hover": {
                      backgroundColor: social.color, opacity: 0.8, transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}>
                  <Icon sx={{ fontSize: "18px" }} />
                </IconButton>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
