/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import banner1 from '../../Assets/Images/slider-1.jpg';
import banner2 from '../../Assets/Images/slider-1.jpg';
import banner3 from '../../Assets/Images/slider-1.jpg';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

function HeroSlider() {
 
  useEffect(() => {
    const swiper = new Swiper(".myheroSwiper", {
      direction: "horizontal",
      loop: false,
      spaceBetween: 0,
      speed: 1000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
     /* autoplay: {
        delay: 3000, // Set delay to 3 seconds
      },*/
      modules: [Autoplay, Pagination, Navigation],
    });
  }, []);

  useEffect(() => {
    const directPlanSwiper = new Swiper(".DirectPlanSwiper", {
      speed: 3000,
      freeMode: true,
      centeredSlides: false,
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      // Responsive breakpoints
      breakpoints: {
        
        // when window width is >= 1200px
        1980: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      modules: [ Pagination, Navigation],
    });
  }, []);

  return (
    <>
      <section id="heroSection">
        <div className="row g-0">
          <div className="container-fluid g-0">
            <div className="row g-0 justify-content-center">
              {/* Hero Slider Section Start */}
              <div className="heroSection___slider">
                <div className="swiper myheroSwiper">
                  <div className="swiper-wrapper">
                    {/* Your slides here */}
                    {/* Slide 1 */}
                    <div className="swiper-slide">
                      <div className="hero_sliedbox">
                        <div className="container-fluid g-0">
                          <div className="row d-flex justify-content-center align-items-center g-0">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 ">
                              <div className="hero_slidbox_right slide-content">
                                <figure className="ban-img">
                                    <img src={banner1.src} className="figure-img img-fluid fullWidth" alt="banner right" />
                                </figure>
                                <div className="slide-text">
                                  <h1>Create Your One More Source of Income with InfyShield</h1>
                                  <p>Unlock the potential to earn from the comfort of your home or while at work
                                    If you're a sales professional, freelancer, student, or stay-at-home individual,
                                    we have ready opportunity with our Easy to Sell Extended Warranty and more
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Slide 2 */}
                    <div className="swiper-slide">
                      <div className="hero_sliedbox">
                        <div className="container-fluid g-0">
                          <div className="row d-flex justify-content-center align-items-center g-0">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 ">
                              <div className="hero_slidbox_right  slide-content">
                                <figure className=" ban-img">
                                    <img src={banner2.src} className="figure-img img-fluid fullWidth" alt="banner right" />
                                </figure>
                                <div className="slide-text">
                                  <h1>Hassle-Free Extended <br />Warranty for Mobile</h1>
                                  <p>A mobile protection plan offers comprehensive coverage for accidental damage, liquid spills,
                                  screen cracks, and even theft or loss. Choose a plan that includes repair/replacement services,
                                  extended warranties, and low deductibles for a stress-free smartphone experience.
                                  </p>
                               </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Slide 3 */}
                    <div className="swiper-slide">
                      <div className="hero_sliedbox">
                        <div className="container-fluid g-0">
                          <div className="row d-flex justify-content-center align-items-center g-0">
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 ">
                              <div className="hero_slidbox_right  slide-content">
                                <figure className=" ban-img">
                                    <img src={banner3.src} className="figure-img img-fluid fullWidth" alt="banner right" />
                                </figure>
                                <div className="slide-text">
                                  <h1 className='mb-4'>Benefits with InfyShield</h1>
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA0lJREFUSEu1ll2IV1UUxX9LjDSiUitI+1BIUCQoIXqaTLFRwjKCIhVExSjMkpixHiqKCgshoUKUEWail4gCsRTJD3SIfAik6MMKtBKNHurBMV9KaXX2n3OHO3fulf/g3/10uWefs87ae5+1tyiZ7S5gPbAAmAKovF76HgIelnS4+Gf7FqAHWATcDvyZfL4B3pT0ReE3fKDtDcAm4KoGkOrvxZI+j5+21+W919bsNdAPrJP0bwvQdjA6mJ2/BF4DjgP/NYBfkHQ6730JeD37/ZwuvBmIM24DetP3/XntENBdAA4C9wKfSXqoTYYtN9u/ADOAT4Blki5U0rQ6MwymM2R7MnASuBqYK+nrMQL+CkxPZ6yW9H51r+1YC5+w6QEY1ONHsB0nKW7Sttn+EZgVxSZpaw3gbOAYEMxbDIdvIKkIcTg9GhcoHRAbdkn6rhKyPcADwFZJUeEjzPZCYH+60F+R1ybAnVH2NTR3S3qwAvgs8A7wm6TIZRVwIK2tSun6NKVraRNgFM5zlb3BsF/ShxXAiNCJHI0nJfUV67ZvToUUlRtPbY2kgVrAthOYHW2/lwUjHvt8ST/Yvi6F+itgJhBpuFvSP00MrwCmVpQmiun3atnnpzEJCDWZA5wFnk9K8zRwB3AGWJhScTR8mwDfziGtSttmSS/URcB25G9flrXC5TywXFK80ZY1Ab6Vb1kGDIZ9kp5qCrntm1L5h/I8kdVmg6Rvy/5NgOOBaTXifboupDWVeX2K0JCkYDjCOlI0YymyjgPavjW/ywj/3svO0PaLwBuhLpK6OwpoeyLwLrA0mrak722/mprIK8BhSfM7DbgDWJsPvS8BDHYEMEtUqMk+SdtKzAqwHklbsghcOkPbS6I5ZybREe4sMRsG6yRg5CrCt6KSk5clRYEMWzshbasB5zBuB1bm03slhQSOsBLgIUkxK416+DFiRMe/pp0RI5d9iPiocSKHtOh/H0l6fBRgdiqGqAPAI5L+Hot6FL6278ldI7rNY5I+bgKcB8SMeWUa5Y7kUS+G3XZtQho/7sod5oY8AHdJOlcLmFk+kyWpadpuF/yn1vwpnarbMOJw23OBjdG1gRsvMupXz4rxIwbnyOsHkv5out3/8neDhaZgDjgAAAAASUVORK5CYII="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">Extended Warranty (EWS)</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA05JREFUSEu1lm3I3mMYxn+HFmZ52yL7QF7yUmjygUhbvhBLkrd8QCKGhWcYoq3Jy9ho3mZjXkqM1Ebylnxas3xQRm37tJWhKKyGvHbsf6zzfvq7dz/P/dyPPeen+76v/339/td5Hsd5nWICw/bhwC3AdcBVkj7TRPBsHwE8BFwKHAKsAIYk/bFXgbZPAx4AzgM2AWc0wGWS5nUO9r+BticB5wL3AjOAt4FVwFvAR5LmtrM4bqDtfVIX4C7gYOAV4HngMOA94H1Jt3eXbGCg7elVm/uBb4HXgeWS/rJ9HPAh8I6k+b30MWag7SOBO+tUW4HHs3mEkI1tHw182vx+APAa8HcB/wVelLQ93/sCSwi3AlcCHwNPStrQ/fa2s76kEcoHtRZwVPojMHNMQNurgYuByUDecHMXaIWktXXCAK+RNNv2QcC7wKHAhZK+H5NKbV8EJJXtOAq4A9i3ThvRJKW7gcDddcp1TY1vkPTnuFRqO+m/BHghcg8D+EFSG/hoGX2JpHzeI/rWsN5+P+Bp4MYy8lDTTdI9fm0Bs341MEdSPNgz+gJtnwO8DHxTtVwraWkHCDzceO+5RlBnpd6SvhqtXY4ILGM/WKdaWNA3gfUtYERxUinxekl5qVGjJ9D2sQVIE75W0ueV2iiyDbwJ+KXS3fFdaptYI2lLN30PoO0rgJXVE+dL2tH5U3PdLAfWSVpdKZ0JfFnr2etAYDYQs18g6ZMRgbbz8LPAZUDa0m5/VeyUtNP2FEm/1WmHRVMKzp23OBkA5kr6blSV2k6jTcfvjqR1k6STm40XNdbYKGlNSzTJxkvAiWX8dKMR4z8ptb1/15Onl+fit+PbawWcBaSHLgOWSvppXKKplE2r9ER5x7SBts+vOy9NfJ6kL/qBOuuj2eIJ4NQS0OIAbU9t+uNTJYzc7K8219DvY4XluZFsEaWmc5wNnAA805j+sTJ5lLdAUk43cPSyRUTydWYTSSttX17jwrbGcxFWxoZ/Bia1vDP83+oumUl+Tm2A+5oGfXNNXY/EGuMF9ayh7Vw7scZQjXm5A2/r1x8HeYnhlFY7S9cIJArNXLmqM0IMsmlfH9rOOJCx4ZRGJG8A97Rv6b0FG1ap7TMj8fJUpq4Ji13wQDosJuIx+gAAAABJRU5ErkJggg=="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">Accidental Damage Protection (ADP)</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAaVJREFUSEvtljFLV1EYh58fKCk22OYq6BziUE2uTekgVBo66SKESEhL30CIlqJwUrOgwNUP4KCDm0OjgpuRrZHwq1fujXOvkn/P1UX+Z7vn3nOfc9773vd9ZNtUx76k/tpc1qXtY6A3XawE+Av4AhxJWsgi1BbZ/gB0A0+AjrhdAk+KiU/ApKT6qbP4tgWsARNAHOhWCVwpJmaAdeBZU6jtHuAjMAosA53AdAAPgK/Ai2I3A8BDSRH/7GE7ALvA1t/PNAcsAeNx5H/D9u04qaTf2aTq++4AP9NoVYA1+BAwkgnelPTtvLX/A84DrzOBTyV9zgVGIu21CL5fbLIR8IGk7VaAtseADaANPBsw22XStEOaFo520tBKpbn5SfPqEqXtHvCyaaVpparVn8kqbYPAcA4tmq6kwwu7ReEgvU27fQkquv5JpQHb/lG4x/NCMe4CQ027vu3Qw1CMnRAz4C3wuJSocJpwkFJ4Zq9AouKXew+UYhZmOFUCTxUOeBfC0xSWhDTVxFMVTUU4JlaB75IWM5Olssz2G6APeAR0pSKcPnitqv8Huh4M1UMi4uAAAAAASUVORK5CYII="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">Extended Warranty with ADP</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABCVJREFUSEudlnvI3nMYxj+XQxYZmTCizGE5JKflVJoZobWFhoVpm9PYEJqYHJY5RCREmBHNtvhD5Fje1mzTcj7Occ4sh0TOs9v3ert/b4/n+f2e5+Vbv56n7+n63vd9Xfd9ix4jIoYAhwLHASOB3YFhwDrgW+CD/BYCfZI83zjUtBIR65cLzwVmALvkvh+BlxJoPWCrfMDWuf4ecIe/JuBawIjYDXgU8O8XxaLbyv9Fkj6te2BE7FisPBm4IK1/Hzha0sft+zsAI2Ii8CDwG3AzcI2k6OV6r0fEpsD5wKWAPXQq8DgwRJK9w78AI+KkBPsMmCjplcEAte+JiH2AZ4HNgU8Au/xp4MIBwIjYGXgL+AYYK+nD/wNWnYmIIxL0I8APt+cW9gMmQRzw4cAoSe90A0tP/Ak8JunvhrhOA+4FxkjqiwhbOLoCdLBvse8lXd+FuXsDtwOH5J4lwHmS3qhxq6Xk9YeTgLcC3yute7tctCWwg6Rfaw5vXNbuAyYAG+XjNgTOyL33lPnrJH3derawfRFwQs7ZExMMeCTwDDBL0o1tBzYoMT3bTC0gmxXLngOmS3JcHArLYV6x5DDgZ2A2cJekv1piebANyaSwxoD3A6cB20n6qg3QVk0BHK8pkhY0xOtMAyXr5xQZXdkUFgO+AIyQtG2NK63HU3Le7L3MspG0toVs5+T8NrnPrvW+2mFAW7VK0pgugKfnpSOAN00UwCK/Atg/5x4CbshYdgW0vx+RNKkL4NB018zMIpukm22p4zYf8NyXPQF76K1y6VBJJkVFlOcBs9Qac970vEPSCBgRribHNlaLvKQDMOdf9a8kp7D+MQjAPmDXwQIOk/RDy+V1gJaIq0MHaVLrnwPv9gJ0djBBVpfqcYkzhutcRAwARoTr4jHA3ZkaZ0u6tk1e+wIvlzDMrVLb8a5ffkEpqIsl+TV2UyX8WUXg26fwDWx9epyVzBydRdn6m1dkYd0OjIgwsZw8xloWc5PyvyTTXjfVK60lsDV2eSYBP9KE+T33/5HZxpmqLi2aTM611vFeBnQVd28yvsRgsmNQLD1R0uIamTh5X5V7DfxkJvyO5N0Sb2v1amCqpPkG/KlUZufGUWmBYzFJkmncMTJmftxaSU/0kJUf6B7IXnPZW2dAlyWXJ8fN3ZgrwwGSVna7rNdaFvQXAZPKIervbwxo1zgfmjiO41Ep4HGS3AH85xERB7m6F+Y6fuMlPVVdUtdEjQMeKA2U09mc0o/cKem7waBGxBbAxS51Wa4MtrT1bFObuJPbB2APV2ngppTEa3UtRUS4A3APMz171RVJklXtD+3WCNv3Zu1FJbnvmQfXlArufqeq7O6B9ktvuJV0QnBdtBZrO/CumSY1aGCXrsNLq3dgtvtuR3zWcnKclxcLl5U9SyVZn43jH2aCsEbD9LQFAAAAAElFTkSuQmCC"
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">All Products & Brands</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAlNJREFUSEu9lk2ITlEYx39/FlLKws5Hinxs9FpQsxAiS3YjJcPGZCHUlLKQItnIAhuRMCmUhZSFKEWSFZoYkh0bZWGDkr/7vJ2r+153uveduTO33t7FOc/5nefr/xzZNv1/HUlv+jcDJeAn4FmDA1YCA0AHCJttwDtJ4w1su1ty4KikoToj2yPA2QQU8CrZfAROSbpRd8ZUgF+AjcBWYAewGLgFHJL0dSLwpIHFHNqeD1wA9gCXJB2YVmAcbjtCPArsDo8l3a+CtuJhfrDtZcBL4C2wWdKfMrRVYPL0WgbcCayQ9HkmgCeB48AaSWPTCrQ9FzgMnAHWA2OSfhahrYXU9kLgORAtsQ64B0ROQ5X+qVkOfJ0t1jZtFAKwPR3SI222Q31uA6sKHsUFBiVFz/YoTZ1AlNcrtdT2AuAIMAycl3S6Kodxs36/cUm/JjKKXEr6UdmHkzFK5T8nk7LV/d401KHnsz0LOAYcBa5mInJC0veKfRGZXLwbc3uAtpcAIUnFMEfCt0h6Xzw1FUkAY/+TBsSYRp0yMEQ4yvl3mgKPgSj3gbKXBeCIpHN1QNvXsxk6VBXSaN4o/wdJ/e9WFUBrwFQQm1KYhiVdrrp928Cl8XTIBPhmJsD7ZwI4G3gIrI3Sr5rgrXqYwjoI3Em/XUU9TOt5W0ytaEqlH/oaz4YrwMGiurTuYfJiHnAR2Js9jr6lR9KjrGWeAotS47fnYe6t7X1pzkUYo5Xy/2j89oHJ2wCFdsb4CS+XJw9fAB/qGj+z2RDz8b/Gb2DY3VLIYVOT7r6/xj9aJI996X4AAAAASUVORK5CYII="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">Replacement if not Required</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABKVJREFUSEullmmoVmUUhZ/VaEUT2UBl+SPFSqsfDVbQTJpZRgNGKjYStxGyUUvNskmy0SgRArNssvJHKjYbRZM2F0REZURzoRJNtnvX1z4fx6/vTvT+uNx77jl7vWvvtdfeAoiIbYBFwGbAsZK+8PPenIhYDzgeGA8cBGwCfJxxr5e01vEUERsDzwEHGxv4HBgn6ZVeAs4GzsgYLwPrA4dmjF0krawAnwWOLODXAgZ5GPAlOiQ90BPQiJhS3psKPAhcDpitSQwELpA0KyL6AyvN8JrywjTgHknnR8RhgC/hj3aT9FlXoFmOb4F3S/r2B7YGXgN2TrA5EdEBzAKuNKADLwBOACYC+wIn+gLAhZL+7gbwdOB+fy9pYUSY4c3AJZJui4iLgNtdvhL3Pf+waDYF3gJ2zxr4+fMZZHU3gLc4ONBf0lcRcUSm05f4pJTnRsBZcg2HNgAT1Dk2yPwsuG/qOpwi6ZfOQLMkrt8QSR9FhNVp4W2X33xQyIwsKZ4D7NMErAeMiA1SBJNSSCMkrWoFjQh/f4dTD4yVZNE4Y9v7AlnHJdlu75tAW8Aaa6fjimTu/vy95WLTs+7LgGMk/drmUtbIk9mjo7oEzNveAFwFvJpBVyUzK/tq4A3gKEmrU7Gu4TulPQy+d2ZqP2BmeWdCt4AJel0Gd42tYLP2JZ4BhkkWe2wFPJ0uUyf6E3CX+9zv9QgwQav0uud2yDSPkfRNRGybabNb3Qn8XBhtUQT3IbBY0tfVDXoDaCFZtYcArtnITGNf4LF8PlWSs9Hp6Q2gm9mtYpM/K5nZ7J1mO4xbY5rT9r8AUyCTM+BLVptbJNP4KGArdMscCLheNmoLqe3plmFEVCo12HGZRjN7MW3QjnJa8cnfirD+KgLxqLs0VfkftusARsROpT6W9aC89Y7l1vZCm/HRCWYHearGaM+U/+L0yx8TdIKkma00617qW3lyWBwelm5Y/39pARxek75r6Jq5doeXgf0msLknS9Z4bvFMu8vQxnSQXPvmqQDvBc4tc9GD086+PMfMXv5Y0ncRUWfWEAjgeTkmozWDR4Qz4x7dw+mVdGuzLSLi5JT142UlGN1uHEWEpf9ENvUUSdNzrHlgm8nFktx/zRMRW5YMuO4GnSzpJv/TFvFCfrRr7iGjgbeLjb1eGXZEjE02Zu85Z2dxdlxL7zF+biaNvaU6yXRhiutfIUXED+WjFcDZdoW8kb/5Huhnw46IwYDdfqIkO07jRESfMkMfsXrLRJghyZa3zokIbwAmZaYdBvwzJT6gTG6zdHNbpWd6CZK0LCL6lb+/9DCV5K2gzsIe6hk6HPAw9qVamVr9Tm8jN17lDOBzjiTvIFXvNWZcRHj98IjxNjevDQszdXqHGbSVaabf6j7AgPY+rwgGeyh3EA9VG6/XvD9y/TCTAe0GcS29ZurLWUCu9doEc7t5K5xtwI3Sjj6NiMsyLZ5no4q6vEDdnb9PkmTmnZ4cUVV6Z2Qs19WCcd+eWt9pqjo5oNdE19ausyFwX+nF87oCaxGS035S7X23j81jTR3QTE17RG5va3IyzJNk5+jxSfWOK/1t23O2FtgWHeAfuT/rEDUu6ukAAAAASUVORK5CYII="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">All Parts Labour Covered</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA9lJREFUSEu1lmmsnlMUhZ8luUUEMUcNUUmN1RBTDCWkUmqqMWmUIDUTggilYv7RSmroL0OrTSoxNIaYLmL4oUFEoqYYiwhCuAktadHlrDrfzdvrvb3flfb8+obz7rX32muv/YoBx/aGwIfAqPpXPk8A+oDJwOuSPh/4XLff1QI4DugFjgOWArcDOwMrgF2Br4BjJH3SLUjzXhvgjsAS4HRJC22vB1wMLAMWAp8B10qau1YAE8T2VcCFwBhJyzuBbW8E/AqMk7RobQJuAbxd+jhP0i01iZ2AK0ovLwfSw1eAGZK+GA7wfyhtVBPKjig07gUkgTdq/56svT0cOLH287UWLfRI+nPg762Ats8E7gOmSlpg+03gS+CcUvlEINQ+BtwGnAKMlvR3I9kk+AKQ6qdLSt9XncEAnwXekzTN9lZFND8CewBHAreWIAn+DHAB8HO5e5Kklyv1UfRTwHeVifHAQ0Xl0yQt6we03QNsCWQO3wdOltRre/fyebGkHttPV1o/Bm4ogdLXZB+ak0TmNYBv1cozu2FrXmFlpqRrmoDvlsz2qZV/XRW61Pb6wO810EHAwwXsLyBimgn8EmGXuX2nsPAo8GLol7TS9jbAS8AfwNGS+lYB2t60OskY4FNgZR5o9CSCWVIcZortHYARUafty8rdG0u/R0YgtiOw3yTFHBJ3CjAL2FZSkvy3h7bH1gwnSXquRXGH1kwnSnq1MSZR5yxJd9s+rPZ1gyqoS4DNioF8FIeS9E0TcJPKe5+kg9vmyvZ04NLSszOqEz1fhXWa7Twfd7qrxrkXuLOKJe04tsQN1f0VzihiOBs4oENHS5WxuIzBRUDmK6q8UtIPtkdUw59dq70jIOXe9cAjEZekn5qAEUMC7N2cmUEqDXWjgbmdPts+r/ayV9JU29sVkc2vxrGojExasvoc2n4cyMWzhgJtJmL7XOAe4AFgjqTFDbGlyuWdGV1t8G2PBB4sFnZU+eMmSaFvjcf25mVHZk3dLGn2UPdbncZ21HW1pM4Cbo1ThRL72hgYKymzOORp24eTqtQHBbQducf+4k4nSPp+SKSBPWzwHsDIelRnWAf0bPtqVaEzco9ndn3aKoxw4jaTJcU7+091pFhVXOjUoshvu0YarML8Xow87zETJO03ADCCegLY7f+AtYqmAu4C5BUiI9JvdbYDuKAOchxk2GdNGz8y37946CGdXq5rwK3rxk6v8toYqtddhRUgm3pFUeL5trMF7i+bYE/gwLb3lW74HZTSCjinuE/2X1wnu29fYPxw39SaiQwFGLVeV7fKB8Dxg22TbqrLnX8AiYKLLIBMvOUAAAAASUVORK5CYII="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">PAN India Coverage</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="blist d-flex align-items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                                                <image
                                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAl5JREFUSEvllk2IjWEUx3//KGF8hIQFM2VhgSQT8pGRBTasJ2k2Q9lZqJGFJRaysZGkWfhYiGJqFhbGghRiN6XxlWTINJN8lfL3HL1X73279869ZroWzuZdPM85v/f8n3PO84gmm5rMowxoexYwAMybpB8ZkbQuH6sInA28BKZm34lwVwBfJM2vB9gvad9EaLbvAisbAtpeAuwFQuprkp5X+gnbq4DdkRFwQ9LbvwXuB85mwPfABkmv8lDbrcDDtG8B8BPYKel2VaDtrlyAacAZ4HpJUttrgcj0FjAMfC1kGQXWAnQCjyW9iPUM2A4cKjtD264g06UccBewPsU4DkR2ZRkCc9MPrk5yHgEGJfXngFuLsZUB+5Jsp4EZwFXgZgBtHwDOZU7PgC2SPhQkXQg8yVSIpU5JV7IM16S1Pdn+Y8COErA3nU2X7VJb/K5S29Ee24GZQJ+kH1WKJoqqA/go6X4uwz9VavtiUqerJnAy26IInEjshnxLGQ4B9xrybHzzJmB5maSNx6jfo9oZRg9GZeXtsqTztnuBpVUQQ2m6dNvuzvoxv+2ppMPVgHeAzcBnYEo2YU5J6rE9CLQB3wrQ6MNHktptnwB6gLFsT6wNSOqoBWyV1GZ7EfAOyAPHJG0s9OGbmEAF4GJJw7ZH0yyODP9zYNzQF5KU04EYbX8jafhHHRxMt8eD8STdViiKk5KOZkVT7xnmQ9QsmqiqOQXgJ0mjdQIr+SPpdcUqrdXG9QDH8S8b3qH3yDhzIy7huNHjEs7bstR734F4EdSyeEy1xGiLZm+a/duHcDPS/AUpXdYBccebfwAAAABJRU5ErkJggg=="
                                                    x="0" y="0" width="28" height="28" />
                                            </svg>
                                            <span className="ms-2">OEM Authorized Service Center</span>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Add more slides similarly */}
                  </div>
                  <div className="swiper-button-next" />
                  <div className="swiper-button-prev" />
                  <div className="swiper-pagination" />
                </div>
              </div>
              {/* Hero Slider Section Ends */}
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default HeroSlider;














