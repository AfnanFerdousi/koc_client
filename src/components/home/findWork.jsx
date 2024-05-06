import { Container, Stack } from "@mui/material";
import Link from "next/link";

export const FindWork = () => {
  return (
    <div className="body4">
      <div className="main4">
        <Container>
          <Stack sx={{ position: "relative" }}>
            <div className="body4-text">
              <h1>YETENEĞİN DOĞRULTUSUNDA İŞ BUL!</h1>
              <p>
                <i className="ri-checkbox-circle-line"></i> Birlikte çalışmaktan
                heyecan duyduğumuz iş verenlerimiz ile tanışın. Kariyerinizi ve
                işinizi zirveye taşıyın.
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i> Serbest
                kariyerinizin her aşaması için fırsatlar bulun.
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i> Ne zaman, nerede ve
                nasıl çalışacağınıza kendiniz karar verin.
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i> Kazanmak için
                KocFreelancing&ados;i kontrol edin, fırsatları bulun.
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i> Unutma!
                KocFreelancing&ados;e <b>kayıt</b> olurken herhangi bir ücret
                ödemiyorsun <b>ayrıca </b>iş İlanlarına teklif verirken ödediğin
                teklif ücretini de işi alamadığın taktirde
                <b>geri iade</b> alıyorsun.
              </p>
              <Link href="/categories">
                <button className="button2">İlanlara Gözat</button>
              </Link>
            </div>
            <div style={{ width: "50%" }}>
              <img src="assets/img/body4.png" alt="body4" />
            </div>
          </Stack>
        </Container>
      </div>
    </div>
  );
};
