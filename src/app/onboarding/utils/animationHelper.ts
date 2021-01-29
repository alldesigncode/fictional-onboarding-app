import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, query, sequence, stagger, style } from '@angular/animations';

export const ANIMATE_ELEM = 'animate-elem';

const easeOutCubic = 'cubic-bezier(0.33, 1, 0.68, 1)';

export class AnimationHelper {

  constructor(protected builder: AnimationBuilder) {}

  protected animate(animationMetaData: AnimationMetadata[], el: HTMLElement): AnimationPlayer {
    const animation = this.builder.build(animationMetaData);
    const player = animation.create(el);
    player.play();

    return player;
  }

  protected get slideOut(): AnimationMetadata[] {
    return [
        sequence([
          query('.' + ANIMATE_ELEM, [
            stagger(75, [
              animate(
                `0.4s ${easeOutCubic}`,
                style({ opacity: 0, transform: 'translateY(-15px)' })
              )
            ])
          ], { optional: true }),
          animate(
            `0.4s ${easeOutCubic}`,
            style({ opacity: 0, transform: 'translateY(-15px)' })
          )
        ])
      ]
    }

  protected get slideIn(): AnimationMetadata[] {
    return [
      sequence([
        animate(
          `0.6s ${easeOutCubic}`,
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
        query('.' + ANIMATE_ELEM, [
          stagger(75, [
            animate(
              `0.4s ${easeOutCubic}`,
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true }),
      ])
    ]
  }
}
