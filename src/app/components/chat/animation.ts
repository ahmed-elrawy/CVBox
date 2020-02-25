import { animate, query, stagger, style, transition, trigger } from '@angular/animations';




export const animatation = trigger('listStagger', [
    transition('* <=> *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
            ':enter',
            [
                stagger(
                    '50ms',
                    animate(
                        '550ms ease-out',
                        style({ opacity: 1, transform: 'translateY(0px)' })
                    )
                )
            ],
            { optional: true }
        )
    ])
])
